"use client"

import React from "react"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

//AuthLayout component is a functional component that takes an object as its single argument, which should have the shape described by the AuthLayoutProps interface.
//In this case, the AuthLayout component expects to receive props with the shape described by the AuthLayoutProps interface.
export default function AuthLayout(children?: React.ReactElement) {
  return <div className="min-h-screen">{children}</div>
}
