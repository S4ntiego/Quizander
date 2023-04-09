import Link from "next/link"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

async function fetchRepoContents(name) {
  const response = await fetch(
    `https://api.github.com/repos/bradtraversy/${name}/contents`,
    {
      next: {
        revalidate: 60,
      },
    }
  )
  const contents = await response.json()
  return contents
}

const RepoDirs = async ({ name }) => {
  const checkUserPromise = new Promise((resolve, reject) => {
    getCurrentUser()
      .then((user) => {
        if (!user) {
          reject(new Error("User not found"))
        } else {
          resolve(user)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })

  checkUserPromise
    .then((user) => {
      return user
    })
    .catch((error) => {
      redirect("/")
    })

  const contents = await fetchRepoContents(name)
  const dirs = contents.filter((content) => content.type === "dir")

  return (
    <>
      Your Name Please enter your full name or a display name you are
      comfortable with.
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default RepoDirs
