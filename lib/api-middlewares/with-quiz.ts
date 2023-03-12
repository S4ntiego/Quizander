import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import prisma from "@/lib/prisma"

export const schema = z.object({
  quizId: z.string(),
})

export function withQuiz(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query)

      // Check if the user has access to this post.
      const session = await getServerSession(req, res, authOptions)
      if (session) {
        const count = await prisma.quiz.count({
          where: {
            id: query.quizId,
            createdById: session.user.id,
          },
        })

        if (count < 1) {
          return res.status(403).end()
        }
      }

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}
