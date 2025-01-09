"use client";

import { useAuth } from "@/context/AuthContext";
import { ChatNavbar } from "./ChatNavbar";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

export function CheckNavbar() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, [user]);


    if (loading) {
        return <div>Loading...</div>;
    }

    // Render navbar based on user state
    return <>{user ? <ChatNavbar /> : <Navbar />}</>;
}