import { createContext, useEffect, useState } from "react"


const AuthContext() = createContext()


export const AuthProvider = ({children}) => {

    const [user , setUser] = useState("")

    useEffect(() => {
        const storedUser = document.cookie

        if (storedUser){
            setUser(storedUser);
        }
    },[])

    const login = (userdata) => {
        setUser(userdata)
    }

    const logout = () => {
        document.coo
    }
}