import {
  GenericResponse,
  IQuizResponse,
  IQuizzesResponse,
} from "../types/index"
import { authApi } from "./authApi"

export const getAllQuizzesFn = async () => {
  const response = await authApi.get<IQuizzesResponse>(`quizzes`)
  return response.data
}

export const getQuizFn = async (id: string) => {
  const response = await authApi.get<IQuizResponse>(`quizzes/${id}`)
  return response.data
}

export const createQuizFn = async (formData: FormData) => {
  const response = await authApi.post<IQuizResponse>(`quizzes`, formData)
  return response.data
}

export const saveQuizDataFn = async (
  quizId: string,
  score: number,
  quizTitle: string
) => {
  const response = await authApi.patch<IQuizResponse>(
    `quizzes/save/${quizId}`,
    {
      score,
      quizTitle,
    }
  )
  return response
}

export const updateQuizFn = async (id: string, formData: FormData) => {
  const response = await authApi.patch<IQuizResponse>(`quizzes/${id}`, formData)
  return response.data
}

export const deleteQuizFn = async (id: string) => {
  const response = await authApi.delete<GenericResponse>(`quizzes/${id}`)
  return response.data
}
