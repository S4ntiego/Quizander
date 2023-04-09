import { Suspense } from "react"
import Link from "next/link"

import { Scoreboard } from "@/components/Dashboard/Scoreboard"
import { Scrb } from "@/components/Scrb"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Link href="/code/repos" className="btn btn-back">
        Back To Repositories
      </Link>
      <Suspense fallback={<div>Loading search...</div>}>
        <Scrb />
      </Suspense>
    </div>
  )
}
export default RepoPage
