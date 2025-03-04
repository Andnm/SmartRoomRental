import React, { useState } from "react";
import "./auth.styles.scss";
import ThirdServicesLogin from "./ThirdServicesLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { getCurrentUserThunk, loginThunk } from "../../redux/actions/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../../redux/selectors/selector";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../../utils/constants";

const LoginModal = ({ setIsLoginModal, triggerCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(userSelector);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(loginThunk(formData));
      if (loginThunk.rejected.match(response)) {
        toast.error(response.payload || response.error.message);
      } else {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());

        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          toast.error(response.payload || response.error.message);
        } else {
          setFormData({
            email: "",
            password: "",
          });
          triggerCancel();

          const userRole = getCurrentUserAction?.payload?.role;

          switch (userRole) {
            case ROLE_ADMIN:
              navigate("/dashboard");
              break;
            case ROLE_CUSTOMER:
              navigate("/");
              break;
            default:
              navigate("/");
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 w-full">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
          ĐĂNG NHẬP
        </h2>
        <form>
          <div className="mb-4">
            <input
              className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Email"
              type="text"
              style={{ borderColor: "#E4E4E7" }}
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-4 relative">
            <input
              className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
              style={{ borderColor: "#E4E4E7" }}
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div className="flex justify-end cursor-pointer">
            <p
              className="hover:underline"
              onClick={() => {
                navigate("/forgot-password");
                triggerCancel();
              }}
            >
              Quên mật khẩu?
            </p>
          </div>

          <div className="mb-2 mt-5">
            <button
              className={`cursor-pointer w-full bg-blue-800 text-white py-4 font-semibold hover:bg-blue-900 disabled:bg-gray-400 ${
                isLoading ? "disabled:cursor-wait" : ""
              }`}
              disabled={isLoading}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Spin spinning={isLoading} />
              Đăng nhập
            </button>
          </div>

          <div className="text-center mb-4">
            <button
              className="cursor-pointer hover:underline font-semibold"
              onClick={() => setIsLoginModal(false)}
              style={{ color: "#618BC9" }}
            >
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

        <ThirdServicesLogin
          triggerCancel={triggerCancel}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default LoginModal;
