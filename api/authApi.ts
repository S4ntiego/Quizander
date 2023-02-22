import axios from "axios"
import { TypeOf, object, string } from "zod"

import { GenericResponse, ILoginResponse, IUserResponse } from "../types/index"

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export type LoginInput = TypeOf<typeof loginSchema>

const updateUserSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
})

export type UpdateUserInput = TypeOf<typeof updateUserSchema>

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
})

export type RegisterInput = TypeOf<typeof registerSchema>

const BASE_URL = "http://localhost:8000/api/"

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh")
  return response.data
}

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>("auth/register", user)
  return response.data
}

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user)
  return response.data
}

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout")
  return response.data
}

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>("users/me")
  return response.data
}

export const updateUserFn = async (user: UpdateUserInput) => {
  const response = await authApi.post<IUserResponse>("users/update", user)
  return response.data
}
