"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
}

interface AuthContextType {
    user: User | null;
    checkAuthStatus: () => Promise<boolean>;
    setUser: (user: User | null) => void; 
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    checkAuthStatus: async () => false,
    setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    console.log("kuch to log ho jaa")


    const checkAuthStatus = async (): Promise<boolean> => {
        console.log("xxx yyy zzz")
        try {
            console.log("Starting authentication status check...");

            const response = await fetch("http://localhost:8080/verify-user", {
                method: "GET",
                credentials: "include", // Include cookies with the request
            });

            console.log("Response object:", response);

            // Check if the response was successful
            if (!response.ok) {
                console.error(
                    "Auth status check failed: Status",
                    response.status,
                    response.statusText
                );
                setUser(null);
                return false;
            }

            const data = await response.json();
            console.log("Response data:", data);

            // Validate user field in the response
            if (data?.user) {
                console.log("User authenticated:", data.user);
                setUser(data.user); // Set user state
                return true;
            } else {
                console.warn("No user field in response data:", data);
                setUser(null); // Clear user state
                return false;
            }
        } catch (error) {
            console.error("Error during auth status check:", error);
            setUser(null);
            return false;
        }
    };

    useEffect(() => {
        const fetchAuthStatus = async () => {
            await checkAuthStatus();
        };
        fetchAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, checkAuthStatus, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
