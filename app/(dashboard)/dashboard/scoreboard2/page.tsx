import { Suspense } from "react"

import { UserNameForm2 } from "@/components/Dashboard/UserNameForm2"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Suspense fallback={<div>Loading directories...</div>}>
        <UserNameForm2 />
      </Suspense>
    </div>
  )
}
export default RepoPage
