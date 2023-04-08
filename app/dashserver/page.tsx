import Link from "next/link"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/session"

const ReposPage = async () => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect("/")
  }

  return (
    <div className="repos-container">
      <h2>Dashboard</h2>
      <Link href="/dashserver/editor">Editor</Link>
      <Link href="/dashserver/profile">Profile</Link>
      <Link href="/dashserver/scoreboard">Scoreboard</Link>
    </div>
  )
}
export default ReposPage
