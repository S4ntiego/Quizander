"use client"

import React from "react"

const UserForm = () => {
  return (
    <div>
      <form onSubmit={() => console.log("test")}>
        <input placeholder="text" type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default UserForm
