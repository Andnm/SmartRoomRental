import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { CiFacebook } from 'react-icons/ci';
import { useDispatch } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { getCurrentUserThunk, loginGoogleThunk } from '../../redux/actions/userThunk';
import { handleActionNotSupport } from '../../utils/helpers';

const ThirdServicesLogin = ({ triggerCancel }) => {
    const dispatch = useDispatch();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("tokenResponse:", tokenResponse)
            try {
                const response = await dispatch(loginGoogleThunk({ token: tokenResponse.code }));
                if (loginGoogleThunk.rejected.match(response)) {
                    toast.error(response.payload || "Đăng nhập thất bại");
                } else {
                    const getCurrentUserAction = await dispatch(getCurrentUserThunk());
                    if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
                        toast.error(response.payload || response.error.message);
                    } else {
                        toast.success("Đăng nhập thành công");
                        triggerCancel();
                    }
                }

            } catch (error) {
                toast.error("Có lỗi xảy ra");
            }
        },
        onError: () => toast.error("Đăng nhập Google thất bại"),
    });

    return (
        <div className="flex space-x-4 justify-center">
            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={handleActionNotSupport}>
                <CiFacebook className='text-blue-600' size={27} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={handleActionNotSupport}>
                <FcGoogle size={25} />
            </button>

            <button className="flex items-center px-8 py-3 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                onClick={handleActionNotSupport}>
                <AiFillApple size={27} />
            </button>
        </div>
    )
}

export default ThirdServicesLogin