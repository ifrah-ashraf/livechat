"use client"
import ChatNavbar from '@/components/ChatNavbar'
import UserLine from '@/components/UserLine'
import React, { useState } from 'react'

function page() {
    const [userArr , setUserArr] = useState<string[]>(["A","B", "C", "D", "E"])
  return (
    <div>
        <ChatNavbar/>
        <UserLine users={userArr}/>
    </div>
  )
}

export default page
