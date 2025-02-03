import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { CiFacebook } from 'react-icons/ci';
import { useDispatch } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { loginGoogleThunk } from '../../redux/actions/userThunk';

const ThirdServicesLogin = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await dispatch(loginGoogleThunk({ token: tokenResponse.access_token }));
                if (loginGoogleThunk.rejected.match(response)) {
                    toast.error(response.payload || "Đăng nhập thất bại");
                } else {
                    toast.success("Đăng nhập thành công");
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra");
            }
        },
        onError: () => toast.error("Đăng nhập Google thất bại"),
    });

    return (
        <div className="flex space-x-4 justify-center">
            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                <CiFacebook className='text-blue-600' size={27} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleGoogleLogin()}>
                <FcGoogle size={25} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                <AiFillApple size={27} />
            </button>
        </div>
    )
}

export default ThirdServicesLogin