import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const quizzes = await prisma.quiz.findMany({
        include: {
          questions: {
            select: {
              question: true,
              answers: { select: { answer: true, isCorrect: true } },
            },
          },
        },
      });
      for (const quiz of quizzes) {
        quiz.coverImage =
          "https://d16toh0t29dtt4.cloudfront.net/" + quiz.coverImage;
      }

      return res.status(200).json(quizzes);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.name, message: error.message });
    }
  }
};

export default handler;
