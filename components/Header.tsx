import Link from "next/link"

const Header = () => {
  return (
    <header className="header h-24">
      <div className="container">
        <div className="links">
          <Link href="/">Main</Link>
          <Link href="/dash/qzs">Dashboard</Link>
          <Link href="/dash/profile">Profile</Link>
        </div>
      </div>
    </header>
  )
}
export default Header
