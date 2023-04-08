import * as React from "react"
import { redirect } from "next/navigation"

import { getCurrentUser, getSession } from "@/lib/session"
import { Card } from "@/components/Card"
import ChangeNameForm from "./ChangeNameButton"

export const UserNameForm2 = async function UserNameForm2() {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect("/")
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Your Name</Card.Title>
        <Card.Description>
          Please enter your full name or a display name you are comfortable
          with.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <ChangeNameForm user={{ id: user.id, name: user.name as string }} />
      </Card.Content>
    </Card>
  )
} as unknown as () => JSX.Element
