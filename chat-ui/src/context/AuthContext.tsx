"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
}

interface AuthContextType {
    user: User | null;
    checkAuthStatus: () => Promise<boolean>;
    setUser: (user: User | null) => void;
    logout: () => Promise<Boolean>;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    checkAuthStatus: async () => false,
    setUser: () => { },
    logout: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);


    console.log("kuch to log ho jaa")

    const logout = async (): Promise<Boolean> => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include"
            })

            if (!response.ok) {
                console.log("logut mein dikkat hai :", response.status, response.statusText)
                return false;
            }

            const data = response.json()
            console.log("Logout function response", data)
            setUser(null)

            return true
        } catch (error) {
            console.log("Error during auth status check:", error);
            return false
        }

    }



    const checkAuthStatus = async (): Promise<boolean> => {

        try {
            console.log("Starting authentication status check...");

            const response = await fetch("http://localhost:8080/verify-user", {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 401) {
                console.log("User is not authenticated: Status 401");
                setUser(null);
                return false;
            }

            // Check if the response was successful
            if (!response.ok) {
                console.log(
                    "Auth status check failed: Status",
                    response.status,
                    response.statusText
                );
                setUser(null);
                return false;
            }

            const data = await response.json();
            console.log("Response data in verify :", data);


            if (data?.user) {
                console.log("User authenticated in context  :", data.user);
                setUser(data.user);
                return true;
            } else {
                console.warn("No user field in response data:", data);
                setUser(null);
                return false;
            }
        } catch (error) {
            console.log("Error during auth status check:", error);
            setUser(null);
            return false;
        }
    };

    useEffect(() => {
        const fetchAuthStatus = async () => {
            await checkAuthStatus();
        };

        fetchAuthStatus();
    }, [])

    return (
        <AuthContext.Provider value={{ user, checkAuthStatus, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
