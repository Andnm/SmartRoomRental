import React, { useEffect, useState } from "react";
import { FaUser, FaInfo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateFallbackAvatar } from "../../utils/helpers";
import { translateRank } from "../../utils/common";
import { MdOutlinePassword } from "react-icons/md";
import { getCurrentUserThunk } from "../../redux/actions/userThunk";

const AccountSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;
  const isProfileSection =
    pathname === "/account" || pathname === "/account/change-password";

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserThunk());
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <div className="w-70 bg-white shadow-md">
      <div className="p-4 border-b border-gray-200">
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
            <h2 className=" text-sm text-gray-600 font-medium">
              {userData?.user?.fullname}
            </h2>
            <p className="text-sm">
              Hạng tài khoản:{" "}
              <span className="font-bold">{translateRank(userData?.user?.membership)}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col my-3 gap-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-500 font-semibold text-sm">TK chính:</p>
            <p className="text-blue-800 font-semibold text-base">
              {userData?.user?.account_balance.toLocaleString() || 0} VND
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-400 font-thin text-base">TK khuyến mãi:</p>
            <p className="text-blue-800 font-semibold text-base">0 VND</p>
          </div>

          <button
            className="cursor-pointer mt-4 py-2 border-2 border-blue-800 text-blue-800 font-semibold rounded-md hover:bg-blue-100 flex items-center justify-center"
            onClick={() => {
              navigate("/addfunds");
            }}
          >
            Nạp tiền
          </button>

          <div className="flex flex-col bg-blue-50 px-2 py-4 gap-1">
            <p className="text-gray-500 font-semibold text-sm">
              Nhân viên hỗ trợ của riêng bạn:{" "}
            </p>
            <p className="text-gray-500 font-semibold text-base">
              Lê Thành Đạt{" "}
            </p>
            <p className="text-blue-800 font-semibold text-sm">033.266.1579</p>
          </div>
        </div>
      </div>

      <nav className="py-4 menu-account">
        <ul className="">
          <li className="group">
            <div
              className={`flex items-center justify-between p-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isProfileSection
                  ? "bg-gray-100 text-blue-800"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUser
                    className={`text-sm ${
                      isProfileSection ? "text-blue-800" : "text-gray-600"
                    }`}
                  />
                </div>
                <span className="">Thông tin cá nhân</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
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
                    className={`flex flex-row items-center gap-2 py-2 px-10 mx-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive("/account")
                        ? "text-blue-800 bg-gray-50"
                        : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                    }`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaInfo
                        className={`text-xs ${
                          isActive("/account")
                            ? "text-blue-800"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    Hồ sơ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/change-password"
                    className={`flex flex-row items-center gap-2 py-2 px-10 mx-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive("/account/change-password")
                        ? "text-blue-800 bg-gray-50"
                        : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                    }`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MdOutlinePassword
                        className={`text-sm ${
                          isActive("/account/change-password")
                            ? "text-blue-800"
                            : "text-gray-600"
                        }`}
                      />
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
