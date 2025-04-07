import React from 'react';

type MessageBody = {
    from: string;
    to: string;
    message: string;
};

function Avatar({ msgData }: { msgData: MessageBody }) {
    const senderInitials = msgData.from.substring(0, 2).toUpperCase();

    return (
        <div className="flex items-start mb-2">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md mr-2">
                <h3>{senderInitials}</h3>
            </div>
            <p className="bg-gray-200 px-3 py-2 rounded-md text-sm max-w-[70%]">
                {msgData.message}
            </p>
        </div>
    );
}

export default Avatar;
