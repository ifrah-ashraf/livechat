import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type MessageBody = {
    from: string
    to: string;
    message: string;
};

function Avatar({ msgData }: { msgData: MessageBody }) {
    const [logInUser, setLogInUser] = useState<string>("")
    const [isSender , setIsSender] = useState<boolean>(false)

    useEffect(() => {
        const currentUserId = Cookies.get("userid")
        if (currentUserId) {
            setLogInUser(currentUserId)
        }

        if (logInUser === msgData.to){
            setIsSender(true)
        }
    }, [logInUser,msgData.to])
    
    

    if (!logInUser) return null

    const senderStr = msgData.from.substring(0, 2).toUpperCase()
    const receiverStr = msgData.to.substring(0, 2).toUpperCase()

    const avatarStr = isSender ? senderStr : receiverStr

    /* useEffect(()=>{
        console.log("Loginuser val ", logInUser , "messsage from : ", msgData.from)
        console.log("isSender value: ", isSender)
    },[msgData.from , msgData.to]) */

    

    return (
        <div>
            {isSender ? <div className="flex justify-end space-y-3">
                <p className="bg-gray-200 px-4 py-2 rounded-md text-sm ">
                    {msgData.message}
                </p>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <h3>{avatarStr}</h3>
                </div>
            </div> :
                <div className="flex">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        <h3>{avatarStr}</h3>
                    </div>
                    <p className="bg-gray-200 px-2 py-2 rounded-md text-sm ">
                        {msgData.message}
                    </p>

                </div>}
        </div>

    );
}

export default Avatar;
