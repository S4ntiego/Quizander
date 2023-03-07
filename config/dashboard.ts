import { DashboardConfig } from "../types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Quizzes",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "user",
    },
  ],
}
