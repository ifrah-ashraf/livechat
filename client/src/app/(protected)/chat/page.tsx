"use client"
import Avatar from '@/components/Avatar';
import { Send } from 'lucide-react';
import React, { useState } from 'react'

function Page() {
    const [msg, setMsg] = useState<string>("")
    const [messages , setMessages] = useState<string >("")

    const handleSubmit = () => {
        setMessages(msg)
    }

    return (
        <div className='w-128 h-112 mx-auto mt-10 shadow-md'>
            <div className='w-full h-full flex flex-col rounded-md bg-purple-300 border-1 '>
                <h2 className='text-lg font-bold mt-8 text-center '>Live Chat Box</h2>

                <div className='w-[90%] h-64 rounded-sm mx-auto mt-8 bg-white flex flex-col '>
                    <h2 className='text-center text-lg'>CHAT</h2>
                    <div className='flex-grow px-2 py-2 overflow-y-auto'>

                        <Avatar message={messages} />
                    </div>
                    <div className="mt-auto p-2">
                        <div className='w-full flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-300'>
                            <input
                                type="text"
                                name="message"
                                placeholder="Enter your message..."
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                className="w-full p-2 text-sm rounded-md outline-none border-none focus:ring-2 focus:ring-purple-400"
                            />

                            <button className="bg-purple-400 hover:bg-purple-600 text-white p-2 rounded-md transition cursor-pointer" onSubmit={handleSubmit}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
