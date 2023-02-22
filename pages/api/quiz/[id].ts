import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const quiz = await prisma.quiz.findUnique({
        where: { id: req.query.id as string },
        include: {
          questions: {
            select: {
              question: true,
              answers: { select: { answer: true, isCorrect: true } },
            },
          },
        },
      });

      return res.status(200).json(quiz);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.name, message: error.message });
    }
  }
};

export default handler;
