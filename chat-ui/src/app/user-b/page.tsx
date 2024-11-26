"use client"

import { useEffect, useState } from "react"

interface Data {
    from: string,
    to: string,
    message: string
}

function page() {
    const [rcvMessage, setRcvMessage] = useState<Data[]>([])
    const [rcvId, setRcvId] = useState("")
    const [message, setMessage] = useState("")
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [id, setId] = useState<String>("user-b")

    const handleClick = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const payload: Data = {
                from: "user-b",
                to: rcvId,
                message: message
            }

            ws.send(JSON.stringify(payload))
            console.log("Sent:", payload);

            setMessage("")
        } else {
            console.error("WebSocket connection is not established.");
        }
    }

    useEffect(() => {
        if (id) {
            const socket = new WebSocket("ws://localhost:8080/chat?id=" + id)
            setWs(socket)

            socket.onopen = () => {
                console.log("Connection established")
            }

            socket.onclose = () => {
                console.log("Connection has been closed")
            }

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socket.onmessage = (event) => {
                try {
                    let rcvData: Data = JSON.parse(event.data)
                    console.log("Message received:", rcvData);
                    setRcvMessage((prevMsg) => [...prevMsg, rcvData])
                } catch (error) {
                    console.error("Error while parsing the message", error)
                }

            };

            return () => {
                socket.close()
            }
        }

    }, [id])

    return (
        <div className="flex flex-col justify-center items-center ">
            <h1 className="text-2xl font-bold text-center text-indigo-600">Live chat application</h1>
            <h2 className="teext-lg font-semibold my-2">
                {id}
            </h2>
            <input
                type="text"
                value={rcvId}
                onChange={(e) => setRcvId(e.target.value)}
                placeholder="Enter the user-ID"
                className="p-4 border-black border-2  mt-4 w-auto mb-4"
            />

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter the message"
                className="p-4 border-black border-2  mt-4 w-auto mb-4"
            />

            <button
                onClick={handleClick}
                className="bg-blue-500 
                  text-white 
                  font-bold 
                  py-2 
                  px-4 
                  rounded 
                  shadow-md 
                  transition 
                  duration-150 
                  ease-in-out 
                  hover:bg-blue-600 
                  active:scale-95 
                  active:shadow-sm"
            >Send message</button>

            <div className="mt-4 w-80 h-auto border-black border-solid border-2 mx-auto bg-slate-200 flex flex-col justify-center items-center">
                Received Message
                <div className="mt-4 text-left">
                    {rcvMessage.map(
                        (val: Data, index) => (
                            <div key={index} className="mb-2 ">
                                {val.message}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>


    )
}

export default page
