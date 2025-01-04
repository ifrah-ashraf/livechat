"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function ChatNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ChatConnect
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Link href="#logout">Log out </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}