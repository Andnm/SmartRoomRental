import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateFallbackAvatar, innkeeper_menu } from "../../utils/helpers";
import { translateRank } from "../../utils/common";
import socketService from "../../services/socket.services";
import { updateMembershipUser } from "../../redux/reducers/userReducer";
import { getCurrentUserThunk } from "../../redux/actions/userThunk";

const InnkeeperSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(userSelector);
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserThunk());
    };

    fetchCurrentUser();
  }, [dispatch]);


  return (
    <div className="w-70 bg-white shadow-md rounded-lg">
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
            <h2 className=" text-sm text-gray-600 font-medium">{userData?.user?.fullname}</h2>
            <p className="text-sm">Hạng tài khoản: {translateRank(userData?.user?.membership)}</p>
          </div>
        </div>

        <div className="flex flex-col my-3 gap-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-500 font-semibold text-sm">TK chính:</p>
            <p className="text-blue-800 font-semibold text-base">{userData?.user?.account_balance.toLocaleString() || 0} VND</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-400 font-thin text-base">TK khuyến mãi:</p>
            <p className="text-blue-800 font-semibold text-base">0 VND</p>
          </div>

          <button
            className="cursor-pointer mt-4 py-2 border-2 border-blue-800 text-blue-800 font-semibold rounded-md hover:bg-blue-100 flex items-center justify-center"
            onClick={() => { navigate('/addfunds') }}
          >
            Nạp tiền
          </button>

          <div className="flex flex-col bg-blue-50 px-2 py-4 gap-1">
            <p className="text-gray-500 font-semibold text-sm">Nhân viên hỗ trợ của riêng bạn: </p>
            <p className="text-gray-500 font-semibold text-base">Lê Thành Đạt </p>
            <p className="text-blue-800 font-semibold text-sm">033.266.1579</p>
          </div>
        </div>
      </div>

      <nav className="py-4 menu-account">
        <ul className="">
          {innkeeper_menu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 mx-2 rounded-lg transition-all duration-200 ${isActive(item.path)
                  ? "text-blue-800 bg-gray-50"
                  : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"
                  }`}
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  {item.icon}
                </div>
                <span className="">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default InnkeeperSidebar;
