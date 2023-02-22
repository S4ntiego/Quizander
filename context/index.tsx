"use client"

import React from "react"

import { IUser } from "../types/index"

type Action = {
  type: string
  payload: IUser | null
}

type State = {
  authUser: IUser | null
}

type Dispatch = (action: Action) => void

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

type StateContextProviderProps = { children: React.ReactNode }

const initialState: State = {
  authUser: null,
}

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        authUser: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
  const value = { state, dispatch }
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useStateContext = () => {
  const context = React.useContext(StateContext)

  if (context) {
    return context
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`)
}

export { StateContextProvider, useStateContext }
