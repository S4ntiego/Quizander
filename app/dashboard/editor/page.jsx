import { Suspense } from "react"

import CreateQuizContainer from "@/components/CreateQuizContainer"

export default async function CreatorPage() {
  return (
    <Suspense fallback={<div>Loading Scoreboard...</div>}>
      <CreateQuizContainer />
    </Suspense>
  )
}
