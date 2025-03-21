import Avatar from '@/components/Avatar';
import React from 'react'

function page() {
    return (
        <div className='w-128 h-112 mx-auto mt-10 shadow-md'>
            <div className='w-full h-full flex flex-col  rounded-md bg-purple-300'>
                <h2 className='text-lg font-bold mt-8 text-center '> live chat box</h2>
                <div className='w-[90%] h-64 rounded-sm mx-auto mt-8 bg-white'>
                    <h2 className='text-center text-lg'> CHAT  </h2>
                    <Avatar />
                </div>
            </div>

        </div>
    )
}

export default page;
