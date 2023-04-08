import * as React from "react"
import { redirect } from "next/navigation"

import { getCurrentUser, getSession } from "@/lib/session"
import { Card } from "@/components/Card"
import ChangeNameForm from "./ChangeNameButton"

export const UserNameForm2 = async function UserNameForm2() {
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
        <ChangeNameForm />
      </Card.Content>
    </Card>
  )
} as unknown as () => JSX.Element
