import React, { useEffect, useState } from "react";
import banner_img from "../../assets/images/banner.png";
import { FaDollarSign, FaFilter, FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import {
  hot_news,
  introduction,
  provinces_outstanding,
  quantity_provinces_dorn,
  rooms_carousel,
  rooms_sample,
} from "../../utils/constants";
import RoomCard from "../../components/room/roomCard/RoomCard";
import { Carousel } from "antd";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdHeart,
} from "react-icons/io";
import { getRandomRating } from "../../utils/common";
import { toast } from "react-toastify";
import { getAllRoomsByGuest } from "../../services/room.services";
import SkeletonRoomCardLoading from "../../components/room/roomCard/SkeletonRoomCardLoading";

function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const responseGetAllItem = await getAllRoomsByGuest();

        const sortedData = [...responseGetAllItem].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOriginalData(sortedData);
      } catch (error) {
        toast.error("There was an error loading data!");
        toast.error(error.response?.data);
        console.error("There was an error loading data!:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredRooms = originalData.filter(
    (room) => room.type === "post_room" && room.status === "active"
  );

  const displayedRooms = filteredRooms.slice(0, 8);

  const list_provinces = [
    "Tất cả",
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Thừa Thiên Huế",
    "Bình Dương",
    "Hà Giang",
  ];

  return (
    <div className="home-page light-gray-background relative">
      {/* banner */}
      <div
        className="banner-container bg-cover bg-center w-full h-96 relative"
        style={{ backgroundImage: `url(${banner_img})` }}
      >
        <div className="container relative">
          <div className="absolute top-20 left-0 transform text-white">
            <h1 className="text-4xl font-bold uppercase">
              Tìm nhanh, kiếm dễ
              <br />
              Trọ Mới toàn quốc
            </h1>
            <p className="mt-4 text-lg font-thin">
              Trang thông tin và cho thuê phòng trọ nhanh chóng, hiệu quả với
              <br />
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
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${
                  activeTab === "all"
                    ? "bg-blue-800 text-white"
                    : "bg-white text-blue-900"
                }`}
                onClick={() => setActiveTab("all")}
              >
                Tất cả
              </button>
              <button
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${
                  activeTab === "room"
                    ? "bg-blue-800 text-white"
                    : "bg-white text-blue-900"
                }`}
                onClick={() => setActiveTab("room")}
              >
                Phòng trọ
              </button>
              <button
                className={`cursor-pointer py-2 px-4 rounded-tl-lg rounded-tr-lg font-semibold ${
                  activeTab === "house"
                    ? "bg-blue-800 text-white"
                    : "bg-white text-blue-900"
                }`}
                onClick={() => setActiveTab("house")}
              >
                Nhà nguyên căn, chung cư
              </button>
            </div>
          </div>

          <div className="flex items-center ">
            <div
              className="bg-blue-800 p-5 rounded-br-lg rounded-tr-lg rounded-bl-lg flex space-x-3 justify-center"
              style={{ width: "1240px" }}
            >
              <div className="flex items-center bg-white rounded-bl-full rounded-tl-full rounded-br-md rounded-br-md px-4 relative">
                <div
                  className="absolute -left-1 w-14 h-14 flex items-center justify-center bg-[#00b7ff] shadow-lg rounded-full text-white hover:bg-[#009ace] cursor-pointer"
                  style={{ boxShadow: "2px 3px 6px rgba(0, 183, 255, 0.5)" }}
                >
                  <FaSearch size={20} />
                </div>
                <div className="w-8 h-0"></div>

                <input
                  type="text"
                  placeholder="Nhập phòng trọ,..."
                  className="p-2 
                rounded-md
                 outline-none  w-46"
                />
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

      {/* MAIN CONTENT */}
      {/* ////////////////// */}
      <div className="mt-20"></div>

      {/* list rooms vip */}
      <div className="container">
        <div className="px-10 py-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 uppercase">
            lựa chọn chỗ ở vip
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonRoomCardLoading key={index} />
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <p className="text-center text-gray-500 text-lg font-semibold">
              Không tồn tại phòng trọ nào có sẵn
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 justify-between ">
              {displayedRooms.map((room, index) => (
                <RoomCard
                  key={index}
                  room={room}
                  is_hot={false}
                  can_navigate={true}
                  show_status={false}
                />
              ))}
            </div>
          )}

          {filteredRooms.length > 8 && (
            <button
              className="cursor-pointer mt-4 px-6 py-3 border-2 border-blue-800 text-blue-800 font-bold rounded-md hover:bg-blue-100 flex items-center"
              onClick={() => {}}
            >
              Xem tất cả <span className="ml-2">→</span>
            </button>
          )}
        </div>
      </div>

      {/* experience-dorn */}
      <div className="experience-dorn my-8 p-8">
        <h2 className="uppercase text-white font-semibold text-center text-xl">
          Trải nghiệm trọ mới tại các tỉnh thành
        </h2>

        <div className="flex justify-center gap-4 my-6">
          {list_provinces.map((item, index) => (
            <div
              className="bg-white rounded-md font-thin text-black px-4 py-2 cursor-pointer transition duration-300 hover:bg-gray-200 hover:shadow-md"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="container">
          <Carousel
            dots={false}
            arrows
            prevArrow={
              <IoIosArrowDropleftCircle className="text-blue-800" size={20} />
            }
            nextArrow={
              <IoIosArrowDroprightCircle className="text-blue-800" size={20} />
            }
            speed={400}
            slidesToShow={4}
            slidesToScroll={1}
            infinite={rooms_carousel.length > 4}
            className="my-6"
            autoplay
            autoplaySpeed={3000}
          >
            {rooms_carousel.map((room) => (
              <div className="" key={room._id}>
                <div className="bg-white rounded-md text-black p-1 shadow-md hover:shadow-lg transition duration-300 mx-2">
                  <img
                    src={room.img_links[0]}
                    alt={room.title}
                    className="h-140 w-full object-cover rounded-md mb-2"
                  />

                  <div className="px-2">
                    <div className="flex items-center mt-1">
                      <IoLocationSharp className="mr-1 text-black" size={25} />
                      <p
                        className="text-black text-xs truncate"
                        title={room.address}
                      >
                        {room.address}
                      </p>
                    </div>

                    <h3 className="text-lg truncate" title={room.title}>
                      {room.title}
                    </h3>

                    <p className="text-md mt-1 text-gray-400">
                      Từ:{" "}
                      <span className="font-semibold text-orange-500">
                        {room.price.toLocaleString()} VND
                      </span>
                    </p>

                    <div className="flex justify-between items-center mb-4 mt-2">
                      <div className="cursor-pointer rounded-md flex justify-center items-center gap-1 bg-gray-100 p-2">
                        <FaStar className="text-orange-500" />
                        <p>{getRandomRating()}</p>
                      </div>

                      <div className="">
                        <IoMdHeart
                          className="cursor-pointer text-gray-400"
                          size={25}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex justify-center">
          <button
            className="cursor-pointer mt-4 px-6 py-3 bg-white text-blue-800 font-bold rounded-md flex items-center transition duration-300 hover:bg-blue-400 hover:text-white hover:shadow-md"
            onClick={() => {}}
          >
            Xem thêm nhiều hơn
          </button>
        </div>
      </div>

      {/* list rooms hot */}
      <div className="container">
        <div className="px-10 py-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 uppercase">
            các tin trọ hot
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonRoomCardLoading key={index} />
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <p className="text-center text-gray-500 text-lg font-semibold">
              Không tồn tại phòng trọ nào có sẵn
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 justify-between ">
              {displayedRooms.map((room, index) => (
                <RoomCard
                  key={index}
                  room={room}
                  is_hot={true}
                  can_navigate={true}
                  show_status={false}
                />
              ))}
            </div>
          )}

          {filteredRooms.length > 8 && (
            <button
              className="cursor-pointer mt-4 px-6 py-3 border-2 border-blue-800 text-blue-800 font-bold rounded-md hover:bg-blue-100 flex items-center"
              onClick={() => {}}
            >
              Xem tất cả <span className="ml-2">→</span>
            </button>
          )}
        </div>
      </div>

      {/* provinces outstanding */}
      <div className="container py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 uppercase text-center">
          Tỉnh thành phố nổi bật
        </h2>

        <div className="grid grid-cols-6 gap-4 cursor-pointer">
          {provinces_outstanding.map((province, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg bg-white pb-4 hover:shadow-lg hover:scale-105 transition-transform duration-200"
              style={{
                minWidth: "200px",
              }}
            >
              <img
                src={province.img_link}
                alt={province.name}
                className="w-full h-60 object-cover rounded-t-lg mb-2"
              />
              <h3 className="text-xl font-semibold px-4">{province.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* introduction */}
      <div className="container py-6 bg-white">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 uppercase text-center">
          Hơn <span className="text-blue-400">50.000</span> chủ trọ tin tưởng
          trọ mới
        </h2>

        <div className="grid grid-cols-3 gap-10 cursor-pointer">
          {introduction.map((province, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg bg-white p-10 pb-0"
            >
              <div className="w-full flex justify-center items-center rounded-t-lg mb-4">
                <img
                  src={province.img_link}
                  alt={province.title}
                  className="w-42 h-50 object-cover rounded-t-lg"
                />
              </div>
              <h3 className=" text-center font-semibold px-4 h-20">
                {province.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10"></div>

      {/* list provinces dorn */}
      <div className="container p-6 bg-white ">
        <h2 className="text-2xl font-bold text-blue-800 uppercase">
          Khám phá trọ được yêu thích ở các tỉnh thành
        </h2>
        <p className="text-gray-400">
          Dưới đây là tổng hợp các tỉnh thành có nhiều trọ mới và được quan tâm
          nhất
        </p>

        <div className="grid grid-cols-5 gap-4 cursor-pointer mt-6">
          {quantity_provinces_dorn.map((item, index) => (
            <div key={index}>
              <p className="font-semibold text-black">{item.province}</p>
              <p className="text-gray-400">{item.quantity} phòng trọ</p>
            </div>
          ))}
        </div>
      </div>

      {/* hot news */}
      <div className="container pt-6 pb-10">
        <h2 className="text-2xl font-bold text-blue-800 uppercase">
          tin tức nổi bật
        </h2>

        <div className="grid grid-cols-4 gap-4 cursor-pointer mt-6">
          {hot_news.map((news_item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg bg-white pb-4 hover:shadow-lg hover:scale-105 transition-transform duration-200"
              style={{
                minWidth: "200px",
              }}
            >
              <img
                src={news_item.img_link}
                alt={news_item.title}
                className="w-full h-full object-cover rounded-t-lg mb-2"
              />

              <div className="flex flex-row px-2 py-2 items-center">
                <p className="text-2xl font-bold text-gray-500">
                  {index < 10 ? `0${index + 1}` : index + 1}
                </p>
                <h3 className="text-lg font-semibold px-4 line-clamp-2">
                  {news_item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
