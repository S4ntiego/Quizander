import { Suspense } from "react"

import { UserNameForm } from "@/components/Dashboard/UserNameForm"

const RepoPage = ({ params: { name } }) => {
  return (
    <div className="card">
      <Suspense fallback={<div>Loading user form...</div>}>
        <UserNameForm />
      </Suspense>
    </div>
  )
}
export default RepoPage
