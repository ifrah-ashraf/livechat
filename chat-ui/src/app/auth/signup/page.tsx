"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <AuthWrapper>
      <AuthCard>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="absolute">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="w-full text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription>Join our chat community today</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">User ID</label>
                <Input 
                  type="text"
                  name="userId"
                  placeholder="Choose a unique user ID" 
                  className="bg-white/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  type="text"
                  name="name"
                  placeholder="Enter your full name" 
                  className="bg-white/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password"
                  name="password"
                  placeholder="Create a strong password" 
                  className="bg-white/50" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sex</label>
                  <Select name="sex">
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input 
                    type="number"
                    name="age"
                    placeholder="Age" 
                    className="bg-white/50" 
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Create Account
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">Already have an account?</p>
              <Link href="/auth/login" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </AuthCard>
    </AuthWrapper>
  );
}