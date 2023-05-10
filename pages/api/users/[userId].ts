import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import prisma from "@/lib/prisma"
import { userNameSchema } from "@/components/Dashboard/UserNameForm"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const session = await getServerSession(req, res, authOptions)

      if (!session?.user) {
        throw new Error("User not found")
      }

      if (req.body?.name) {
        const payload = userNameSchema.parse(req.body)

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            name: payload.name,
          },
        })
      }

      return res.end()
    } catch (error) {
      return res.status(500).json({ error: error.name, message: error.message })
    }
  }
}

export default withMethods(["PATCH"], withCurrentUser(handler))
