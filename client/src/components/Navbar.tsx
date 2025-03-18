import Link from 'next/link';
import React from 'react';

function Navbar() {
    return (
        <nav className="bg-gray-600 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">LiveChat </h1>
            <Link 
                href="/auth/login" 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
                Login
            </Link>
        </nav>
    );
}

export default Navbar;
