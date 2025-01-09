"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react" ;
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function LoginPage() {

  const {setUser} = useAuth()

  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (userId === "" || password === "") {
        alert("Please enter the credentials")
        return
      }


     const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          userId,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include" ,

      });

      if (response.ok) {
      
        const data =await response.json()

        setUser({id : data.userid})
        router.push("/protected");
        console.log("user data after login ", data); // Log the response JSON for debugging

      } else {
        const msg = await response.text()

        alert (`the error is ${msg}`)
      }

      setUserId("");
      setPassword("");
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="absolute text-slate-600 hover:text-slate-900">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="w-full text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-slate-500">Enter your credentials to continue</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">User ID</label>
              <Input
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}

                placeholder="Enter your user ID"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Password</label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-white/50"
              />
            </div>
            <Button type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Login
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-500">New to ChatConnect?</p>
              <Link href="/auth/signup" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                Create an account
              </Link>
            </div>
          </form>
        </CardContent>
      </AuthCard>
    </AuthWrapper>
  );
}