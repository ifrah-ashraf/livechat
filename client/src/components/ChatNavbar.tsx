import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function ChatNavbar() {
    const [profileId, setProfileId] = useState<string>("");

    useEffect(() => {
        const id = Cookies.get("userid");
        if (id) {
            setProfileId(id);
        }
    }, []);

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    
            <div className="flex items-center space-x-10">
                <h1 className="text-xl font-bold text-purple-600">livechat</h1>
                <span className="text-gray-700  font-semibold text-md">Welcome  : <span className="font-medium ">{profileId}</span></span>
            </div>

           
            <div className="flex items-center gap-6">
                <button
                    className="text-md text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Profile"
                >
                    Profile
                </button>
                <button
                    className="text-md text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Logout"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
