"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'
import useWebSocket from '@/hooks/useWebsocket'


function Page() {
    const [userid, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
   //const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedUserId = userid.trim();
        const trimmedPassword = password.trim();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                userid: trimmedUserId,
                password: trimmedPassword,
            }, {
                withCredentials: true
            });

            Cookies.set("userid", response.data.userid, { expires: 7, path: "/" });
            

            console.log("Login Successful:", response.data);
            setMessage("Login Successful!");
            
           /*  if (response.status === 200){
                router.push("/chat")
            } */
        } catch (error: any) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                setMessage(error.response.data.message || "Login Failed!");
            } else {
                console.error("Error:", error.message);
                setMessage("An error occurred. Please try again.");
            }
        }
    };


    return (
        <div className="w-96 h-80 mx-auto mt-10 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg shadow-md w-full h-full flex flex-col justify-evenly">
                <h2 className="text-center font-semibold">LOGIN FORM</h2>

                {message && (
                    <p className={`text-center ${message.includes("Successful") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}

                <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={userid}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter username"
                        className="w-full p-2 border bg-white border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full p-2 border bg-white border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Page
