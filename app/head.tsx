import { siteConfig } from "@/config/site"

export default function Head() {
  return (
    <>
      <title>{`${siteConfig.name} - ${siteConfig.description}`}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={siteConfig.description} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
    </>
  )
}
