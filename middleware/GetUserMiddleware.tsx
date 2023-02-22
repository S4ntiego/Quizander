"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

import { getMeFn } from "../api/authApi"
import { useStateContext } from "../context"

type GetUserMiddlewareProps = {
  children: React.ReactElement
}

const GetUserMiddleware: React.FC<GetUserMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"])
  const stateContext = useStateContext()

  const query = useQuery(["authUser"], () => getMeFn(), {
    enabled: !!cookies.logged_in,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data })
    },
  })

  return children
}

export default GetUserMiddleware
