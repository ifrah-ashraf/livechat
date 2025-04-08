// Page.tsx
"use client";
import ChatNavbar from '@/components/ChatNavbar';
import UserLine from '@/components/ChatUser';
import MessageBox from '@/components/ChatBoxLogic/MessageBox';
import React, { useState } from 'react';


export default function Page() {
    const [userArr, setUserArr] = useState<string[]>([]);
    const [currentUser, setIsCurrentUser] = useState<string>("");

    return (
        <div className="h-screen flex flex-col">
            <ChatNavbar />
            <div className="flex flex-grow">
                <div >
                    {/* Side mein User name waala component */}
                    <UserLine
                        users={userArr}
                        activeUser={currentUser}
                        onSelectUser={(user) => {
                            console.log("Selected user in main component", user);
                            setIsCurrentUser(user);
                        }}
                        onAddUser={(user) => {
                            if (!userArr.includes(user)) {
                                setUserArr((prev) => [...prev, user]);
                            }
                        }}
                    />
                </div>
                <div className="flex-grow p-4 bg-orange-200">
                    <MessageBox users={userArr} rcvUser={currentUser} />
                </div>
            </div>
        </div>
    );
}
