import React, { useState } from "react";
import "./auth.styles.scss";
import ThirdServicesLogin from "./ThirdServicesLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginModal = ({ setIsLoginModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 w-full">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times">
            </i>
          </button>
        </div>
        <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
          ĐĂNG NHẬP
        </h2>
        <form>
          <div className="mb-4">
            <input className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Email"
              type="text"
              style={{ borderColor: "#E4E4E7" }}
            />
          </div>

          <div className="mb-4 relative">
            <input className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
              style={{ borderColor: "#E4E4E7" }}
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div className="mb-2 mt-10">
            <button className="cursor-pointer w-full bg-blue-800 text-white py-4 font-semibold hover:bg-blue-900" type="submit">
              Đăng nhập
            </button>
          </div>

          <div className="text-center mb-4">
            <button className="cursor-pointer hover:underline font-semibold"
              onClick={() => setIsLoginModal(false)}
              style={{ color: "#618BC9" }}>
              Đăng ký tài khoản mới
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <div className="px-2 text-gray-500 " style={{ color: "#A0A1A4" }}>
            Tiếp tục với
          </div>
          <hr className="flex-grow border-gray-300" />
        </div>

        <ThirdServicesLogin />

      </div>
    </div>
  );
};

export default LoginModal;
