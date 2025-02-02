import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { CiFacebook } from 'react-icons/ci';

const ThirdServicesLogin = () => {
    return (
        <div className="flex space-x-4 justify-center">
            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                <CiFacebook className='text-blue-600' size={27} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                <FcGoogle size={25} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                <AiFillApple size={27} />
            </button>
        </div>
    )
}

export default ThirdServicesLogin