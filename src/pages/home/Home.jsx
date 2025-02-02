import React, { useState } from "react";
import "./styles.scss";
import banner_img from "../../assets/images/banner.png";
import { FaDollarSign, FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function Home() {
  const [activeTab, setActiveTab] = useState("all");


  return (
    <div className="home-page light-gray-background relative">
      {/* banner */}
      <div
        className="banner-container bg-cover bg-center w-full h-96 relative"
        style={{ backgroundImage: `url(${banner_img})` }}
      >
        <div className="container relative">
          <div className="absolute top-20 left-0 transform text-white">
            <h1 className="text-4xl font-bold uppercase">Tìm nhanh, kiếm dễ<br />Trọ Mới toàn quốc</h1>
            <p className="mt-4 text-lg font-thin">
              Trang thông tin và cho thuê phòng trọ nhanh chóng, hiệu quả với<br />
              hơn 500 tin đăng mới và 30.000 lượt xem mỗi ngày
            </p>
          </div>
        </div>

      </div>

      {/* filter */}
      <div className="container ">
        <div className=" absolute top-80">
          <div className="flex items-center">
            <div className="flex space-x-1 mt-4">
              <button
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${activeTab === "all" ? "bg-blue-800 text-white" : "bg-white text-blue-900"}`}
                onClick={() => setActiveTab("all")}
              >
                Tất cả
              </button>
              <button
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${activeTab === "room" ? "bg-blue-800 text-white" : "bg-white text-blue-900"}`}
                onClick={() => setActiveTab("room")}
              >
                Phòng trọ
              </button>
              <button
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${activeTab === "house" ? "bg-blue-800 text-white" : "bg-white text-blue-900"}`}
                onClick={() => setActiveTab("house")}
              >
                Nhà nguyên căn, chung cư
              </button>
            </div>
          </div>

          <div className="flex items-center ">
            <div className="bg-blue-800 p-5 rounded-br-lg rounded-tr-lg rounded-bl-lg flex space-x-3 justify-center" style={{ width: "1240px" }}>
              <div className="flex items-center bg-white rounded-bl-full rounded-tl-full rounded-br-md rounded-br-md px-4 relative">
                <div
                  className="absolute -left-1 w-14 h-14 flex items-center justify-center bg-[#00b7ff] shadow-lg rounded-full text-white hover:bg-[#009ace] cursor-pointer"
                  style={{ boxShadow: "2px 3px 6px rgba(0, 183, 255, 0.5)" }}
                >
                  <FaSearch size={20} />
                </div>
                <div className="w-8 h-0"></div>

                <input type="text" placeholder="Nhập phòng trọ,..." className="p-2 
                rounded-md
                 outline-none  w-46" />
              </div>

              <div className="flex items-center bg-white rounded-md px-4 py-1">
                <IoLocationSharp className="icon-filter" size={20} />

                <select className="p-2 rounded-md outline-none w-48 select-option">
                  <option>Địa điểm</option>
                </select>
              </div>

              <div className="flex items-center bg-white rounded-md px-4">
                <FaDollarSign className="icon-filter" size={20} />

                <select className="p-2 rounded-md outline-none w-48 select-option">
                  <option>Giá</option>
                </select>
              </div>

              <div className="flex items-center bg-white rounded-md px-4">
                <FaFilter className="icon-filter" size={20} />
                <select className="p-2 rounded-md outline-none w-48 select-option">
                  <option>Diện tích</option>
                </select>
              </div>

              <button className="cursor-pointer bg-orange-500 text-white font-semibold py-2 px-10 rounded-md flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105 shadow-md hover:shadow-lg">
                Tìm kiếm <FaSearch className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* main content */}
      <div className="mt-18">
        <div className="container h-50">asd</div>
      </div>
    </div>
  );
}

export default Home;
