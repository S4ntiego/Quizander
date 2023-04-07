import Link from "next/link"

export default async function DashboardLayout({ children }) {
  return (
    <div>
      <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-gray-800">
        <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
          <Link href="/">Quizander</Link>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
          {/* to jest wyszukiwarka acme */}
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">xD</div>
          </div>

          {/* to jest glowny kontener na childreny */}
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
          </div>

          {/* to jest footer */}
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">xD</div>
          </div>
        </div>
      </div>
    </div>
  )
}
