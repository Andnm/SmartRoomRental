import React, { useState } from "react";
import { FaUser, FaInfo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import { Link, useLocation } from "react-router-dom";
import { generateFallbackAvatar } from "../../utils/helpers";
import { translateRank } from "../../utils/common";
import { MdOutlinePassword } from "react-icons/md";

const AccountSidebar = () => {
  const userData = useSelector(userSelector);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;
  const isProfileSection =
    pathname === "/account" || pathname === "/account/change-password";

  return (
    <div className="w-70 bg-white shadow-md">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3 justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={
                userData?.user?.avatar_url ??
                generateFallbackAvatar(userData?.user?.fullname)
              }
              alt="avatar"
              loading="lazy"
              className="w-12 h-12"
            />
          </div>
          <div>
            <h2 className=" text-sm text-gray-400">{userData?.user?.fullname}</h2>
            <p className="text-sm">Hạng tài khoản: {translateRank(userData?.user?.rank)}</p>
          </div>
        </div>


      </div>

      <nav className="py-4 menu-account">
        <ul className="">
          <li className="group">
            <div
              className={`flex items-center justify-between p-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isProfileSection
                ? "bg-gray-100 text-blue-800"
                : "hover:bg-gray-50"
                }`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUser
                    className={`text-sm ${isProfileSection ? "text-blue-800" : "text-gray-600"
                      }`}
                  />
                </div>
                <span className="">Thông tin cá nhân</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isProfileMenuOpen && (
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/account"
                    className={`flex flex-row items-center gap-2 py-2 px-10 mx-2 text-sm rounded-lg transition-all duration-200 ${isActive("/account")
                      ? "text-blue-800 bg-gray-50"
                      : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                      }`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaInfo className={`text-xs ${isActive("/account") ? "text-blue-800" : "text-gray-600"
                        }`} />
                    </div>

                    Hồ sơ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/change-password"
                    className={`flex flex-row items-center gap-2 py-2 px-10 mx-2 text-sm rounded-lg transition-all duration-200 ${isActive("/account/change-password")
                      ? "text-blue-800 bg-gray-50"
                      : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                      }`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MdOutlinePassword className={`text-sm ${isActive("/account/change-password") ? "text-blue-800" : "text-gray-600"
                        }`} />
                    </div>
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            )}
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default AccountSidebar;
