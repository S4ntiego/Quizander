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
      href: "/dashh/profile",
      icon: "user",
    },
    {
      title: "Scoreboard",
      href: "/dashh/scoreboard",
      icon: "trophy",
    },
    {
      title: "Quizzes",
      href: "/dashh/qzs",
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
