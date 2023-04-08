import Link from "next/link"

async function fetchRepo(name) {
  const response = await fetch(
    `https://api.github.com/repos/bradtraversy/${name}`,
    {
      next: {
        revalidate: 60,
      },
    }
  )
  const repo = await response.json()
  return repo
}

const Repo = async ({ name }) => {
  const repo = await fetchRepo(name)

  return (
    <>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <div className="card-stats">
        <div className="card-stat">
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="card-stat">
          <span>{repo.forks_count}</span>
        </div>
        <div className="card-stat">
          <span>{repo.watchers_count}</span>
        </div>
      </div>
    </>
  )
}
export default Repo
