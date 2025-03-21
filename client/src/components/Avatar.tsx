import React from 'react'

function Avatar() {
    return (
        <div className="h-8 w-8 rounded-full bg-indigo-400 ml-1 flex items-center justify-evenly">
            <h3 className="text-center font-semibold ">IA</h3>
            <div>
                <input type="text" className='' name='message'/>
            </div>
        </div>
    )
}

export default Avatar
