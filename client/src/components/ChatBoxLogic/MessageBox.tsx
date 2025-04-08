// MessageBox.tsx
"use client";
import Cookies from 'js-cookie';
import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ClientAvatar from '../ClientAvatar';
import Avatar from '../Avatar';
import useWebSocket from '@/hooks/useWebsocket';

type MessageBody = {
    from: string;
    to: string;
    message: string;
};
interface UserInfo {
    users: string[],
    rcvUser: string
}
let messageMap = new Map<string, MessageBody[]>()

const MessageBox = ({ users, rcvUser }: UserInfo) => {
    const [msg, setMsg] = useState<string>("");
    const [rcvId, setRcvId] = useState<string>("");
    const [sendId, setSendId] = useState<string>("");
    const [chatLog, setChatLog] = useState<MessageBody[]>([]);

    const { sendMessage } = useWebSocket("ws://localhost:8080/chat", (incoming) => {
        setChatLog((prev) => [...prev, incoming]);
    });

    useEffect(() => {
        const senderId = Cookies.get("userid");
        if (senderId) {
            setSendId(senderId);
        }

    }, []);

    const handleSend = () => {
        const recvUser = rcvUser;
        setRcvId(recvUser);

        if (rcvId && msg) {
            const newMessage: MessageBody = {
                from: sendId,
                to: rcvId,
                message: msg,
            };


            messageMap.set(rcvId, [...(messageMap.get(rcvId) || []), newMessage])

            setChatLog((prev) => [...prev, newMessage]);
            if (newMessage.from !== newMessage.to) {
                sendMessage(newMessage);
            }
            setMsg("");
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center border-1 border-gray-500 rounded-b-2xl">
                Live Chat with <span className='text-green-400'>  {rcvUser || '...'}</span>
            </h2>

            <div className="flex-grow overflow-y-auto bg-gray-50 rounded-md p-4 space-y-2">
                {chatLog.map((val, index) => (
                    val.from === sendId ? (
                        <ClientAvatar key={index} message={val.message} />
                    ) : (
                        <Avatar key={index} msgData={val} />
                    )
                ))}
            </div>

            <div className="mt-4 flex gap-2 items-center border-t pt-4">
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




/* 

// this will update the client side UI locally
            setChatLog((prev) => [...prev, newMessage])

            // Send to server only when it is coming from other users
            // here in newMessage add one id field to keep track of different messages (better approach)
*/