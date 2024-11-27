"use client"
import React, { useState } from 'react'

function page() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = async () => {
    const response = await fetch("http://localhost:8080/login",{
      method : "POST", 
      headers : {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body : JSON.stringify({
        "userid":userId,
        "password":password
      })
    })

    const data = response.json()

    setPassword("")
    setUserId("")
    console.log(data)
    
  }

  return (
    <div className='flex flex-col mx-auto w-auto justify-center items-center'>
      <h1 className='text-2xl font-semibold ' >SIGN UP</h1>
      <div className="mt-2 flex flex-col mb-2 space-y-4">
        <input
          type="text"
          placeholder='user Id'
          className='border-2 border-black border-solid p-2'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="text"
          placeholder='password'
          className='border-2 border-black border-solid p-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleClick}
          className='bg-blue-500 text-white 
          py-2 
          px-4 
          rounded 
          shadow-md 
          transition 
          duration-150 
          ease-in-out 
          hover:bg-blue-600 
          active:scale-95 
          active:shadow-sm font-bold'>Login</button>
           
      </div>
    </div>
  )
}

export default page
