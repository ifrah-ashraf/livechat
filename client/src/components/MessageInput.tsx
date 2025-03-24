import React, { useState } from 'react';
import { Send } from 'lucide-react';
import useWebSocket from '@/hooks/useWebsocket';

function MessageInput() {
    const [sndId, setSendId] = useState<string >("")
    const [rcvId , setRcvId] = useState<string >("")
    const [msg , setMsg] = useState<string>("")


    return (
        <div className='w-full flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-300'>
            <input
                type="text"
                name="message"
                placeholder="Enter your message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full p-2 text-sm rounded-md outline-none border-none focus:ring-2 focus:ring-purple-400"
            />

            <button className="bg-purple-400 hover:bg-purple-600 text-white p-2 rounded-md transition cursor-pointer">
                <Send size={18} />
            </button>
        </div>
    );
}

export default MessageInput;
