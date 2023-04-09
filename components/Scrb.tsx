"use client"

import * as React from "react"
import { useSession } from "next-auth/react"

import { Card } from "@/components/Card"

async function fetchScoreboard(userId) {
  const response = await fetch(`/api/scoreboard/${userId}`)
  const scoreboard = await response.json()
  return scoreboard
}

export default async function UserNameForm2() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Your Name</Card.Title>
        <Card.Description>
          Please enter your full name or a display name you are comfortable
          with.
        </Card.Description>
      </Card.Header>
      <Card.Content></Card.Content>
    </Card>
  )
}
