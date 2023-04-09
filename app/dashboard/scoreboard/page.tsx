import { Suspense } from "react"
import Link from "next/link"

import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Link href="/code/repos" className="btn btn-back">
        Back To Repositories
      </Link>
      <Suspense fallback={<div>Loading search...</div>}>
        <UserNameForm2 />
      </Suspense>
    </div>
  )
}
export default RepoPage