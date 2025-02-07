import React, { useState } from "react";
import { FaShoppingBag, FaFileInvoiceDollar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import { Link, useLocation } from "react-router-dom";
import { generateFallbackAvatar, innkeeper_menu } from "../../utils/helpers";
import { translateRank } from "../../utils/common";

const InnkeeperSidebar = () => {
  const userData = useSelector(userSelector);

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;

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
            <h2 className=" text-sm text-gray-600 font-medium">{userData?.user?.fullname}</h2>
            <p className="text-sm">Hạng tài khoản: {translateRank(userData?.user?.rank)}</p>
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
