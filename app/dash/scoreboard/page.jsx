import { Suspense } from "react"
import Repo from "@/app/componets/Repo"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Suspense fallback={<div>Loading search...</div>}>
        <Repo />
      </Suspense>
    </div>
  )
}
export default RepoPage
