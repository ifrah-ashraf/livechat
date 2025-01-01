"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfaff] via-[#f8faff] to-[#fefefe] animate-gradient bg-[length:400%_400%]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMC0xMmMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiM3YzNhZWQxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 animate-in fade-in slide-in-from-top duration-700">
              <MessageCircle className="h-12 w-12 text-indigo-500" />
              <h1 className="text-5xl font-bold text-indigo-500">ChatConnect</h1>
            </div>
            
            <p className="max-w-2xl text-xl text-slate-600 animate-in fade-in slide-in-from-bottom duration-700">
              Experience real-time conversations like never before. Connect with friends, family, and colleagues instantly through our secure and intuitive chat platform.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Button asChild size="lg" variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="p-6 rounded-lg bg-gradient-to-b from-white/95 to-white/90 border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform">
              <Zap className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Real-time Chat</h3>
              <p className="text-slate-600">Instant message delivery with real-time updates and notifications.</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-b from-white/95 to-white/90 border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform">
              <Shield className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Secure</h3>
              <p className="text-slate-600">End-to-end encryption ensures your conversations stay private and secure.</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-b from-white/95 to-white/90 border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform">
              <Users className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">User Friendly</h3>
              <p className="text-slate-600">Intuitive interface designed for seamless communication experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}