import { Icons } from "@/components/Icons"

const LoadingPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Icons.spinner className="h-64 w-64 animate-spin" />
    </div>
  )
}
export default LoadingPage
