import React, { Suspense } from "react"

import Qzs from "@/components/Qzs"

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading quizzes...</div>}>
        <Qzs />
      </Suspense>
    </div>
  )
}

export default page
