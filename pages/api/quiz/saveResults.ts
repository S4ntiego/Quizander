import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { quizId, userId, score } = JSON.parse(req.body)

    try {
      const quizScore = await prisma.quizScore.create({
        data: {
          score,
          userId,
          quizId,
        },
      })

      return res.status(200).json(quizScore)
    } catch (error) {
      return res.status(500).json({ error: error.name, message: error.message })
    }
  }
}

export default handler
