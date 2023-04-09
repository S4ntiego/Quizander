import Link from "next/link"

const RepoDirs = async ({ name }) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

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
