import { Suspense } from "react"
import Link from "next/link"

import Repo from "@/components/Repo"
import RepoDirs from "@/components/RepoDirs"
import UserNameForm2 from "@/components/dashboard/UserNameForm2"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Link href="/code/repos" className="btn btn-back">
        Back To Repositories
      </Link>
      <Suspense fallback={<div>Loading search...</div>}>
        <UserNameForm2 />
      </Suspense>
      <Suspense fallback={<div>Loading repo...</div>}>
        <Repo name={name} />
      </Suspense>
      <Suspense fallback={<div>Loading directories...</div>}>
        <RepoDirs name={name} />
      </Suspense>
    </div>
  )
}
export default RepoPage
