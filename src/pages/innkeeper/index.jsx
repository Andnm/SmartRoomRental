"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import InnkeeperLayout from "../../components/layout/InnkeeperLayout";
import { Spin } from "antd";
import { generateFallbackAvatar } from "../../utils/helpers";
import { FaHome, FaUsers } from "react-icons/fa";

const Innkeeper = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);

  const options_list = [
    {
      name: "Phòng trọ",
      des: "Chỗ ở sạch sẽ, an ninh, giá hợp lý, thích hợp cho sinh viên và người đi làm.",
      link: "",
      icon: <FaHome size={80} color="#1E40AF" />,
    },
    {
      name: "Tìm bạn ở ghép",
      des: "Tìm bạn ở ghép, chung cư sạch đẹp, an ninh tốt...",
      link: "",
      icon: <FaUsers size={80} color="#1E40AF" />,
    },
  ];

  return (
    <InnkeeperLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div class="container mx-auto">
          <div class=" mb-8">
            <h1 class="text-xl font-bold text-blue-800">
              ĐĂNG TRỌ MỚI CỦA QUÝ VỊ LÊN{" "}
              <span class="text-blue-400">TROSMART.COM</span>
            </h1>
            <p class="text-black font-semibold">Chọn loại hình muốn đăng</p>
          </div>
          <div class="grid grid-cols-2 space-y-4 md:space-y-0 md:space-x-4">
            {options_list.map((item, index) => (
              <div
                class=" border p-6 rounded-sm border-gray-200 text-center flex flex-col items-center justify-between"
                key={index}
              >
                <div className="mb-4">{item.icon}</div>
                <h2 class="text-lg font-bold text-blue-900 mb-2">
                  {item.name}
                </h2>
                <p class="text-gray-700 mb-4 font-semibold">{item.des}</p>
                <button
                  className="cursor-pointer bg-blue-800 text-white px-4 py-2 rounded transform transition-all hover:bg-blue-400 hover:scale-105"
                  onClick={() => {}}
                >
                  Đăng ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InnkeeperLayout>
  );
};

export default Innkeeper;
