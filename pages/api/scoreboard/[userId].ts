import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const scoreboard = await prisma.quizCategory.findMany({
        include: {
          quizzes: {
            where: {
              quizScores: {
                some: { userId: parseInt(req.query.userId as string) },
              },
            },

            include: {
              quizScores: {
                where: {
                  userId: parseInt(req.query.userId as string),
                },
                orderBy: { createdAt: "desc" },
              },
            },
          },
        },
      })

      res.status(200).json(scoreboard)
    } catch (err) {
      console.log(err)
    }
  }
}

export default handler
