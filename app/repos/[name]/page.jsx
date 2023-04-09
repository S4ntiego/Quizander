import { Suspense } from "react"
import Link from "next/link"

import Repo from "@/components/Repo"
import RepoDirs from "@/components/RepoDirs"
import UserForm from "@/components/UserForm"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Link href="/repos" className="btn btn-back">
        Back To Repositories
      </Link>
      <Suspense fallback={<div>Loading search...</div>}>
        <UserForm />
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
