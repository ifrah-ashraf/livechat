import React, { useState } from 'react';

function Avatar({ message }: { message: string }) {
    const [IsSender, setIsSender] = useState<Boolean>(true);

    return (
        <div className="flex justify-end gap-2">
            <p className="bg-gray-200 px-2 py-1 rounded-md text-sm ">
                {message}
            </p>
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                <h3>IA</h3>
            </div>



        </div>
    );
}

export default Avatar;
