"use client";

import { useAuth } from "@/context/AuthContext";
import { ChatNavbar } from "./ChatNavbar";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

export function CheckNavbar() {
    const { user, checkAuthStatus, setUser  } = useAuth(); // Access context functions and state
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchAuthStatus = async () => {
            console.log("Fetching auth status in CheckNavbar...");
            setLoading(true); 
            const isAuthenticated = await checkAuthStatus(); 
            
            console.log("boolean value", isAuthenticated);
            if (!isAuthenticated) {
                console.log("User  not authenticated in CheckNavbar");
                setUser (null); 
            } else {
                console.log("User  authenticated in CheckNavbar: xD", user);
            }
            setLoading(false); 
        };

        fetchAuthStatus(); 
    }, [checkAuthStatus, setUser ]);

    useEffect(() => {
        console.log("Updated user status is: ", user);
    }, [user]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    // Render navbar based on user state
    return <>{user ? <ChatNavbar /> : <Navbar />}</>;
}