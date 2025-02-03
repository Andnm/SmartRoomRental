import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { BsSend } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { Modal } from "antd";
import LoginModal from "../../auth/LoginModal";
import RegisterModal from "../../auth/RegisterModal";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

  const showModal = (isLogin) => {
    setIsLoginModal(isLogin);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const menuItems = [
    { name: "Phòng trọ", to: "/boarding" },
    { name: "Nhà nguyên căn, chung cư", to: "/apartment-fullhouse" },
    { name: "Tìm bạn ở ghép", to: "/looking-for-teammates" },
    { name: "Blog", to: "/blogs" },
  ];

  return (
    <header className="header-home-page border-b border-gray-200">
      <div className="container">
        <nav className="bg-white py-4 flex justify-between items-center">
          <img src={logo} alt="SMART Logo" className="logo cursor-pointer" onClick={() => navigate("/")} />

          <div className="flex menu gap-4 items-center">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `menu-item font-semibold hover:underline ${isActive ? "text-blue-800 underline" : "text-black"}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button className="px-4 py-2 cursor-pointer post-button text-white rounded-lg flex items-center hover:bg-blue-600 hover:text-white hover:scale-105 hover:border-blue-500 transition-all duration-300">
              <BsSend className="mr-2" />
              Đăng trọ mới ngay
            </button>


            <div className="px-4 py-2 cursor-pointer auth-button text-white rounded-lg flex items-center">
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
          <LoginModal setIsLoginModal={setIsLoginModal} />
        ) : (
          <RegisterModal setIsLoginModal={setIsLoginModal} />
        )}
      </Modal>
    </header>
  );
}

export default Header;
