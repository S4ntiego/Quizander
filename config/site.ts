import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    linkedin: string
    github: string
    midjourney: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Quizander",
  description: "Verify your knowledge about the Harry Potter's universe.",
  mainNav: [
    {
      title: "Quizzes",
      href: "/",
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/adam-ksi%C4%85%C5%BCek-6538141a1/",
    github: "https://github.com/S4ntiego",
    midjourney: "https://midjourney.com",
  },
}
