// MessageBox.tsx
"use client";
import Cookies from 'js-cookie';
import { Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ClientAvatar from '../ClientAvatar';
import Avatar from '../Avatar';
import useWebSocket from '@/hooks/useWebsocket';

type MessageBody = {
    from: string;
    to: string;
    message: string;
};
interface UserInfo {
    currentUser: string,
    onAddUser: (user: string) => void
}

const MessageBox = ({ currentUser, onAddUser }: UserInfo) => {
    const [msg, setMsg] = useState<string>("");
    const [sendId, setSendId] = useState<string>("");
    const [selectedUser , setSelectedUser] = useState<string>("")

    const messageMapRef = useRef(new Map<string, MessageBody[]>())
    const [chatlog, setChatlog] = useState<MessageBody[]>([])

    const { sendMessage } = useWebSocket("ws://localhost:8080/chat", (incoming) => {
        if (!messageMapRef.current.has(incoming.from)) {
            const newUser = incoming.from.trim()
            onAddUser(newUser)
        }

        const prevMsgs = messageMapRef.current.get(incoming.from) || []
        const updatedMsgs = [...prevMsgs, incoming]
        messageMapRef.current.set(incoming.from, updatedMsgs)

        if (incoming.from === currentUser){
            setChatlog(updatedMsgs)
        }
        
        console.log("Receiver map", messageMapRef)

    });

    useEffect(() => {
        const senderId = Cookies.get("userid");
        if (senderId) {
            setSendId(senderId);
        }

    }, []);

    useEffect(() => {
        const userSelected = currentUser
        setSelectedUser(userSelected)
        if (!currentUser) { return } 
        
        const previousMsgs = messageMapRef.current.get(currentUser) || []
        setChatlog(previousMsgs)
    }, [currentUser])

    const handleSend = () => {
        const recvUser = currentUser;

        if (recvUser && msg) {
            const newMessage: MessageBody = {
                from: sendId,
                to: recvUser,
                message: msg,
            };

            const prevMsgs = messageMapRef.current.get(recvUser) || []
            const updatedMsgs = [...prevMsgs, newMessage]
            messageMapRef.current.set(recvUser, updatedMsgs)

            setChatlog(updatedMsgs)
            sendMessage(newMessage)
            setMsg("")

            console.log("Map ", messageMapRef)

        } else {
            console.log("Receiver id and msg are required")
        };
    }

    return (
        <div className="flex flex-col h-full  w-full bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center border-b border-gray-300 pb-2">
                Live Chat with <span className="text-green-400">{currentUser || '...'}</span>
            </h2>

            <div className="flex-grow max-h-screen overflow-y-auto bg-gray-50 rounded-md p-4 space-y-2">
                {chatlog.map((val, index) =>
                    val.from === sendId ? (
                        <ClientAvatar key={index} message={val.message} />
                    ) : (
                        <Avatar key={index} msgData={val} />
                    )
                )}
            </div>
            <div className="mt-2 flex gap-2 items-center border-t pt-3 bg-white">
                <input
                    type="text"
                    name="message"
                    placeholder="Type a message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                    onClick={handleSend}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>

    );
};

export default MessageBox;

