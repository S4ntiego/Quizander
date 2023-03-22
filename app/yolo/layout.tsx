interface LayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <body className="h-full w-full">
      <div className="landing flex flex-col items-center w-full h-full">
        <header className="flex-initial w-full top-0 fixed h-16 bg-slate-500">
          elesalelsa
        </header>
        <main className="flex-1 mt-16 bg-green-500 ">
          elodsdasdasdsadsadasdas
        </main>
      </div>
      <div className=" bg-red-500">elo</div>
      <footer className="py-16 bg-yellow-500">elo</footer>
    </body>
  )
}
