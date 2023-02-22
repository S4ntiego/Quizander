"use client"

import React from "react"
import { redirect } from "next/navigation"
import { getMeFn } from "@/api/authApi"
import { useStateContext } from "@/context"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

const RequireUser = ({
  children,
  allowedRoles,
}: {
  children: React.ReactElement
  allowedRoles: string[]
}) => {
  const [cookies] = useCookies(["logged_in"])
  const stateContext = useStateContext()

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(["authUser"], getMeFn, {
    retry: 1,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data })
    },
  })

  const loading = isLoading || isFetching

  if (loading) {
    return <div>loading</div>
  }

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <div>{children}</div>
  ) : (
    redirect("/login")
  )
}

export default RequireUser
