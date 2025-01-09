"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ChatNavbar() {
  const {logout} = useAuth()
  const [isLogin , setIsLogin] = useState<boolean>(true)

  const handleClick = async () => {
    const logoutStatus = await logout()

    if (!logoutStatus){
      console.log("Error while logging out check auth context method")
      return
    }

    console.log("User logout status ", logoutStatus)
    setIsLogin(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/protected" className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ChatConnect
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button  asChild onClick={handleClick} className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Link href="/">Log out </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}