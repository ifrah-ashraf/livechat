"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [message , setMessage] = useState("")
  const [ws , setWs] = useState<WebSocket | null >(null)

  const handleClick = () => {
    if (ws){
      ws.send(message)
      console.log(message)
    }else{
      alert("lmao connection is closed")
      console.error("WebSocket connection is not established.");
    }
  }

  useEffect( () => {
    const socket = new WebSocket("ws://localhost:8080/")
    setWs(socket)

    return () =>{
      socket.close()
    }
  } , [])

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold text-center text-blue-400">Live chat application</h1>
      
      <input 
      type="text"
      value={message}
      onChange={(e)=> setMessage(e.target.value)}
      placeholder="Enter the message"
      className="p-4 border-black border-2  mt-4 w-auto mb-4"
      />

      <button 
      onClick={handleClick}
      className="p-2 border-black border-2 border-solid w-auto"
      >Send message</button>

    </div>
    

  )
}
        