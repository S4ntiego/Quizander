import * as React from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { Card } from "@/components/Card"
import ChangeNameForm from "./ChangeNameButton"

export async function UserNameForm2() {
  const user = await getCurrentUser()

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
        <React.Suspense fallback={<div>Loading user form</div>}>
          <ChangeNameForm user={{ id: user.id, name: user.name as string }} />
        </React.Suspense>
      </Card.Content>
    </Card>
  )
}