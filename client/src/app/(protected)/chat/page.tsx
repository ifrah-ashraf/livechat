"use client";
import Avatar from '@/components/Avatar';
import ClientAvatar from '@/components/ClientAvatar';
import useWebSocket from '@/hooks/useWebsocket';
import Cookies from 'js-cookie';
import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type MessageBody = {
    from: string;
    to: string;
    message: string;
};

function Page() {
    const [msg, setMsg] = useState<string>("");
    const [rcvId, setRcvId] = useState<string>("");
    const [sendId, setSendId] = useState<string>("")
    const { sendMessage } = useWebSocket("ws://localhost:8080/chat", (incoming) => {
        setChatLog(prev => [...prev, incoming]);
    });

    const [chatLog, setChatLog] = useState<MessageBody[]>([]);

    useEffect(() => {
        const senderId = Cookies.get("userid");
        if (senderId) {
            setSendId(senderId)
        }
    }, [])


    const handleSend = () => {
        if (rcvId && msg) {
            const newMessage: MessageBody = {
                from: sendId,
                to: rcvId,
                message: msg,
            };

            // this will update the client side UI locally
            setChatLog((prev) => [...prev , newMessage])

            // Send to server only when it is coming from other users
            // here in newMessage add one id field to keep track of different messages (better approach)
            if (newMessage.from != newMessage.to){
                sendMessage(newMessage);
            }
            setMsg("");
        } else {
            console.error("Receiver ID and message are required");
        }
    };
    return (
        <div className='w-128 h-112 mx-auto mt-10 shadow-md'>
            <div className='w-full h-full flex flex-col rounded-md bg-purple-300 border-1 '>
                <h2 className='text-lg font-bold mt-8 text-center '>Live Chat Box</h2>
                <input
                    type="text"
                    placeholder='Receiver Id'
                    value={rcvId}
                    onChange={(e) => setRcvId(e.target.value)}
                    className='w-1/2 p-2 text-sm mx-auto bg-white'
                />
                <div className='w-[90%] h-64 rounded-sm mx-auto mt-8 bg-white flex flex-col '>
                    <h2 className='text-center text-lg'>CHAT</h2>
                    <div className='flex-grow px-2 py-2 overflow-y-auto'>
                        {chatLog.map((val, index) => {
                            return val.from === sendId ? (
                                <ClientAvatar key={index} message={val.message} />
                            ) : (
                                <Avatar key={index} msgData={val} />
                            );
                        })}
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
                            <button className="bg-purple-400 hover:bg-purple-600 text-white p-2 rounded-md transition cursor-pointer" onClick={handleSend}>
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
