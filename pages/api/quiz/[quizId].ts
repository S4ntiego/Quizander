import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
import { unstable_getServerSession } from "next-auth"
import { z } from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withQuiz } from "@/lib/api-middlewares/with-quiz"
import deleteS3 from "@/lib/awsDelete"
import uploadS3 from "@/lib/awsUpload"
import prisma from "@/lib/prisma"
import runMiddleware from "@/lib/runMiddleware"
import { authOptions } from "../auth/[...nextauth]"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

interface RequestWithFile extends NextApiRequest {
  file?: any
}

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method === "DELETE") {
    try {
      await prisma.quiz.delete({
        where: {
          id: req.query.quizId as string,
        },
      })

      res.revalidate("/")
      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const quizId = req.query.quizId as string
      const quiz = await prisma.quiz.findUnique({
        where: {
          id: quizId,
        },
      })

      await runMiddleware(req, res, upload.single("coverImage"))

      if (req.file && quiz && session) {
        await deleteS3(
          process.env.AWS_S3_BUCKET_NAME as string,
          quiz.coverImage
        )
        const coverImageName = crypto.randomBytes(32).toString("hex")
        const uploadImageParams = (await uploadS3(
          process.env.AWS_S3_BUCKET_NAME as string,
          coverImageName,
          req.file.buffer,
          req.file.mimetype
        )) as { Location: string }

        await prisma.quiz.update({
          where: {
            id: quiz.id as string,
          },
          data: {
            title: JSON.parse(req.body.title),
            description: JSON.parse(req.body.description),
            category: JSON.parse(req.body.category),
            questions: {
              deleteMany: {},
              create: JSON.parse(req.body.questions).map((question: any) => ({
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
            createdById: session.user.id,
          },
        })

        return res.json({
          quiz: quiz,
          src: uploadImageParams.Location,
          error: "",
        })
      } else {
        if (quiz && session) {
          await prisma.quiz.update({
            where: {
              id: quiz.id as string,
            },
            data: {
              title: JSON.parse(req.body.title),
              description: JSON.parse(req.body.description),
              category: JSON.parse(req.body.category),
              questions: {
                deleteMany: {},
                create: JSON.parse(req.body.questions).map((question: any) => ({
                  question: question.question,
                  answers: {
                    create: question.answers.map((answer: any) => ({
                      answer: answer.answer,
                      isCorrect: answer.isCorrect,
                    })),
                  },
                })),
              },
              createdById: session.user.id,
            },
          })

          return res.json({
            quiz: quiz,
            error: "",
          })
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withMethods(["DELETE", "PATCH"], withQuiz(handler))
