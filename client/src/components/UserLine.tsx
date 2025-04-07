import React from 'react'

interface UserLineProps {
    users: string[];
    onSelectUser?: (user: string) => void
    activeUser?: string;
}

const UserLine = ({ users, onSelectUser , activeUser }: UserLineProps) => {
    return (
        <aside className="w-64 h-full border-r border-gray-200 bg-gray-50 p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Chats</h2>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li
                        key={user}
                        className={`cursor-pointer px-4 py-2 rounded-md text-gray-800 hover:bg-blue-100 ${activeUser === user ? "bg-blue-200 font-bold" : ""
                            }`}
                        onClick={() => {
                            console.log("User clicked :", user)
                            onSelectUser?.(user)
                        }}
                    >
                        {user}
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default UserLine
