import Link from "next/link"

import { getCurrentUser } from "@/lib/session"

const ReposPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="repos-container">
      <h2>Dashboard</h2>
      <Link href="/dash/editor">Editor</Link>
      <Link href="/dash/profile">Profile</Link>
      <Link href="/dash/scoreboard">Scoreboard</Link>
    </div>
  )
}
export default ReposPage
