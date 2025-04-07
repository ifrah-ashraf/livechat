import React from 'react';

function ClientAvatar({ message }: { message: string }) {
    return (
        <div className="flex justify-end items-start mb-2">
            <p className="bg-purple-200 px-3 py-2 rounded-md text-sm max-w-[70%]">
                {message}
            </p>
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md ml-2">
                <h3>U</h3>
            </div>
        </div>
    );
}

export default ClientAvatar;
