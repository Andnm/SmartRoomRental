import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { Avatar, Modal } from "antd";

import logo from "../../../assets/images/logo.png";
import LoginModal from "../../auth/LoginModal";
import RegisterModal from "../../auth/RegisterModal";
import { userSelector } from "../../../redux/selectors/selector";
import { logoutUser } from "../../../redux/reducers/userReducer";
import { generateFallbackAvatar } from "../../../utils/helpers";
import { getCurrentUserThunk } from "../../../redux/actions/userThunk";
import { menuItemsHeader, ROLE_ADMIN, ROLE_CUSTOMER } from "../../../utils/constants";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(userSelector);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleRelogin = async () => {
      const token = await localStorage.getItem("accesstoken");
      if (token !== "undefined") {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());
        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
     
        } else {
          const userRole = getCurrentUserAction?.payload?.role;
          const currentPath = location.pathname

          switch (userRole) {
            case ROLE_ADMIN:
              navigate("/dashboard");
              break;
            case ROLE_CUSTOMER:
              navigate(currentPath);
              break;
            default:
              navigate("/");
          }
        }
      }
    };
    handleRelogin();
  }, []);

  const showModal = (isLogin) => {
    setIsLoginModal(isLogin);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="header-home-page border-b border-gray-200">
      <div className="container">
        <nav className="bg-white py-4 flex justify-between items-center">
          <img
            src={logo}
            alt="SMART Logo"
            className="logo cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex menu gap-4 items-center">
            {menuItemsHeader.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `menu-item font-semibold hover:underline ${
                    isActive ? "text-blue-800 underline" : "text-black"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              className="px-4 py-2 cursor-pointer post-button text-white rounded-lg flex items-center hover:bg-blue-600 hover:text-white hover:scale-105 hover:border-blue-500 transition-all duration-300"
              onClick={() => navigate("/innkeeper")}
            >
              <BsSend className="mr-2" />
              Đăng trọ mới ngay
            </button>

            <div
              className="relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="px-4 py-2 cursor-pointer auth-button text-white rounded-lg flex items-center">
                {user?.user ? (
                  <>
                    <Avatar
                      src={
                        user?.user?.avatar_url ??
                        generateFallbackAvatar(user?.user?.fullname)
                      }
                      alt={"avatar"}
                      style={{
                        marginRight: "8px",
                        border: "1px solid #d9d9d9",
                      }}
                      size={25}
                    />

                    <span className="auth-link hover:underline cursor-pointer truncate">
                      {user?.user?.fullname}
                    </span>
                  </>
                ) : (
                  <>
                    <HiOutlineLogout className="mr-2" />
                    <span
                      className="auth-link hover:underline cursor-pointer"
                      onClick={() => showModal(true)}
                    >
                      Đăng nhập
                    </span>
                    <span className="mx-2">/</span>
                    <span
                      className="auth-link hover:underline cursor-pointer"
                      onClick={() => showModal(false)}
                    >
                      Đăng ký
                    </span>
                  </>
                )}
              </div>

              {user?.user && isDropdownOpen && (
                <div className="absolute right-0 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul className="py-3">
                    <li
                      className="px-8 py-2 flex flex-row gap-2 items-center hover:bg-gray-100 hover:text-blue-800 cursor-pointer"
                      onClick={() => navigate("/account")}
                    >
                      <FaUser className="text-sm" />
                      Thông tin cá nhân
                    </li>

                    <li
                      className="px-8 py-2 flex flex-row gap-2 my-2 items-center hover:bg-gray-100 hover:text-blue-800 cursor-pointer"
                      onClick={() => navigate("/innkeeper")}
                    >
                      <IoHome className="text-sm" />
                      Dành cho chủ trọ
                    </li>

                    <li
                      className="px-8 py-2 flex flex-row gap-2 items-center hover:bg-gray-100 text-red-500 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <RiLogoutBoxRLine className="text-sm" />
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
        style={{ top: 20 }}
      >
        {isLoginModal ? (
          <LoginModal
            setIsLoginModal={setIsLoginModal}
            triggerCancel={handleCancel}
          />
        ) : (
          <RegisterModal
            setIsLoginModal={setIsLoginModal}
            triggerCancel={handleCancel}
          />
        )}
      </Modal>
    </header>
  );
}

export default Header;
