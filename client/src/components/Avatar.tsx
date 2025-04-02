import React, { useEffect, useState } from 'react';

type MessageBody = {
    from : string
    to: string;
    message: string;
  };

function Avatar({ msgData }: { msgData: MessageBody }) {
    const [IsSender, setIsSender] = useState<Boolean>(true);

    useEffect(() => {
        console.log("msg from child Avatar component", msgData.message);
    }, [msgData.message]);

    return (
        <div>
            {IsSender ? <div className="flex justify-end space-y-3">
                <p className="bg-gray-200 px-4 py-2 rounded-md text-sm ">
                    {msgData.message}
                </p>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <h3>IA</h3>
                </div>
            </div> :
                <div className="flex">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        <h3>IA</h3>
                    </div>
                    <p className="bg-gray-200 px-2 py-2 rounded-md text-sm ">
                        {msgData.message}
                    </p>

                </div>}
        </div>

    );
}

export default Avatar;
