// Page.tsx
"use client";
import ChatNavbar from '@/components/ChatNavbar';
import UserLine from '@/components/ChatUser';
import MessageBox from '@/components/ChatBoxLogic/MessageBox';
import React, { useState } from 'react';


export default function Page() {
    const [userArr, setUserArr] = useState<string[]>([]);
    const [currentUser, setIsCurrentUser] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<string | null>(null)

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <ChatNavbar />
            {/* Desktop layout*/}
            <div className="hidden md:flex flex-grow ">

                <UserLine
                    users={userArr}
                    activeUser={currentUser}
                    onSelectUser={(user) => {
                        setIsCurrentUser(user);
                        setSelectedUser(user);
                    }}
                    onAddUser={(user) => {
                        if (!userArr.includes(user)) {
                            setUserArr((prev) => [...prev, user]);
                        }
                    }}
                />

                <div className="flex-grow p-4 bg-orange-200">
                    <MessageBox
                        currentUser={currentUser}
                        onAddUser={(user) => {
                            if (!userArr.includes(user)) {
                                setUserArr((prev) => [...prev, user]);
                            }
                        }}
                        onBack={() => setSelectedUser(null)}
                    />
                </div>
            </div>
            {/* Mobile layout */}
            <div className="flex flex-col md:hidden flex-grow">
                {!selectedUser ? (
                    <UserLine
                        users={userArr}
                        activeUser={currentUser}
                        onSelectUser={(user) => {
                            setIsCurrentUser(user);
                            setSelectedUser(user);
                        }}
                        onAddUser={(user) => {
                            if (!userArr.includes(user)) {
                                setUserArr((prev) => [...prev, user]);
                            }
                        }}
                    />
                ) : (
                    <MessageBox
                        currentUser={selectedUser}
                        onAddUser={(user) => {
                            if (!userArr.includes(user)) {
                                setUserArr((prev) => [...prev, user]);
                            }
                        }}
                        onBack={() => setSelectedUser(null)}
                    />
                )}
            </div>
        </div>
    );

}
