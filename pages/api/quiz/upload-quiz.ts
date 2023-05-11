import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
import { getSession } from "next-auth/react"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import uploadS3 from "@/lib/awsUpload"
import prisma from "@/lib/prisma"
import runMiddleware from "@/lib/runMiddleware"

interface RequestWithFile extends NextApiRequest {
  file?: any
}

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    const coverImageName = crypto.randomBytes(32).toString("hex")

    if (!session) {
      return res.status(400).json({ error: "User not logged in" })
    }

    //temporary solution before resetting the database to include user roles
    if (session?.user.email !== "adamksiazek123@gmail.com") {
      return res
        .status(400)
        .json({ error: "Only admin users can add quizzes." })
    }

    if (req.method === "POST") {
      await runMiddleware(req, res, upload.single("coverImage"))

      if (!req.file) return res.status(400).json({ error: "File empty" })

      const {
        title,
        description,
        questions,
        category,
        lowScore,
        mediumScore,
        highScore,
      } = req.body

      if (!title || !description || !questions || !category) {
        return res.status(400).json({ error: "Please provide all values" })
      }

      const uploadResult = (await uploadS3(
        process.env.AWS_S3_BUCKET_NAME as string,
        coverImageName,
        req.file.buffer,
        req.file.mimetype
      )) as { Location: string }

      const quiz = await prisma.quiz.create({
        data: {
          title: JSON.parse(title),
          description: JSON.parse(description),
          categoryId: parseInt(JSON.parse(category)),
          lowScore: JSON.parse(lowScore),
          mediumScore: JSON.parse(mediumScore),
          highScore: JSON.parse(highScore),
          questions: {
            create: JSON.parse(questions).map((question: any) => ({
              question: question.question,
              answers: {
                create: question.answers.map((answer: any) => ({
                  answer: answer.answer,
                  isCorrect: answer.isCorrect,
                })),
              },
            })),
          },
          coverImage: coverImageName,
          createdById: session.user.id as number,
        },
      })

      if (process.env.NODE_ENV === "production") {
        await res.revalidate("/")
      }

      return res.json({
        quiz: quiz,
      })
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.name, message: error.message })
  }
}

export default withMethods(["POST"], withAuthentication(handler))
