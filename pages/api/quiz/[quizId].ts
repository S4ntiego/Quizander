import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
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
  const session = await getServerSession(req, res, authOptions)

  if (req.method === "DELETE") {
    try {
      const quiz = await prisma.quiz.delete({
        where: {
          id: parseInt(req.query.quizId as string),
        },
      })

      await deleteS3(process.env.AWS_S3_BUCKET_NAME as string, quiz.coverImage)

      if (process.env.NODE_ENV === "production") {
        await res.revalidate("/")
      }
      return res.status(204).end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const quizId = req.query.quizId as string
      const quiz = await prisma.quiz.findUnique({
        where: {
          id: parseInt(quizId),
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

        console.log(req.body.category)

        await prisma.quiz.update({
          where: {
            id: quiz.id,
          },
          data: {
            title: JSON.parse(req.body.title),
            description: JSON.parse(req.body.description),
            categoryId: parseInt(JSON.parse(req.body.category)),
            lowScore: JSON.parse(req.body.lowScore),
            mediumScore: JSON.parse(req.body.mediumScore),
            highScore: JSON.parse(req.body.highScore),
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
              id: quiz.id,
            },
            data: {
              title: JSON.parse(req.body.title),
              description: JSON.parse(req.body.description),
              categoryId: parseInt(JSON.parse(req.body.category)),
              lowScore: JSON.parse(req.body.lowScore),
              mediumScore: JSON.parse(req.body.mediumScore),
              highScore: JSON.parse(req.body.highScore),
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

          if (process.env.NODE_ENV === "production") {
            await res.revalidate("/")
          }
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
