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
      title: "Quizzes",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "ScoreboardGetServerSession",
      href: "/dashboard/scoreboard",
      icon: "trophy",
    },
    {
      title: "ScoreboardGetSession",
      href: "/dashboard/scoreboard2",
      icon: "trophy",
    },
    {
      title: "ScoreboardUseSession",
      href: "/dashboard/scoreboard3",
      icon: "trophy",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
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
