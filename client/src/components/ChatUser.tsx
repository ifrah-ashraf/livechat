import React, { useState } from 'react'

interface UserLineProps {
    users: string[];
    onAddUser: (user: string) => void
    onSelectUser: (user: string) => void
    activeUser: string;
}

const ChatUser = ({ users, onAddUser, onSelectUser, activeUser }: UserLineProps) => {
    const [newUser, setNewUser] = useState<string>("")

    const handleAddUser = () => {
        const adduser = newUser.trim()
        onAddUser(adduser)
        setNewUser("")
    }

    return (
        <aside className="w-96 h-full border-r border-gray-200 bg-gray-100 p-2">
            <h2 className="text-xl ml-2 font-semibold mb-4 text-gray-700">Chat User </h2>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    placeholder="Enter user name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddUser}
                    className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition cursor-pointer"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {users.map((user) => (
                    <li
                        key={user}
                        className={`cursor-pointer px-4 py-2 rounded-md text-gray-800 hover:bg-blue-100 ${activeUser === user ? "bg-blue-200 font-bold" : ""
                            }`}
                        onClick={() => {
                            console.log("User selected in line component:", user)
                            onSelectUser(user)
                        }}
                    >
                        {user}
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ChatUser 
