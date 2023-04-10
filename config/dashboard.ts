import { MainNavItem, MobileNavItem } from "types/nav"

interface DashboardConfig {
  mainNav: MainNavItem[]
  mainDashboardNav: MainNavItem[]
  mobileNav: MobileNavItem[]
  mobileDashboardNav: MobileNavItem[]
  dashboardNav: MainNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      // title: "Quizzes",
      // href: "/quizzes",
    },
  ],
  mainDashboardNav: [],
  dashboardNav: [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
    },
    {
      title: "Scoreboard",
      href: "/dashboard/scoreboard",
      icon: "trophy",
    },
    {
      title: "Quizzes",
      href: "/dashboard/quizzes",
      icon: "post",
    },
  ],
  mobileNav: [
    {
      items: [
        {
          title: "Quizzes",
          href: "/",
        },
      ],
    },
  ],
  mobileDashboardNav: [
    {
      items: [
        {
          title: "Quizzes",
          href: "/dashboard",
        },
        {
          title: "Scoreboard",
          href: "/dashboard/scoreboard",
        },
        {
          title: "Profile",
          href: "/dashboard/profile",
        },
      ],
    },
  ],
}
