import React from "react";
import { Link, useParams } from "react-router-dom";
import { boardingCategories, rooms_sample } from "../../utils/constants";
import ImageGridGallery from "../../components/room/gallery/ImageGridGallery";
import { IoLocationSharp } from "react-icons/io5";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { translateHousingCategory } from "../../utils/common";
import { IoMdPerson } from "react-icons/io";
import { FaClock, FaDollarSign } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { EnvironmentIcon, ObjectIcon, useScrollToTop, UtilityIcon } from "../../utils/helpers";
import address_guide from "../../assets/images/address_guide.png";


function BoardingDetail() {
  useScrollToTop();

  const { id } = useParams();

  const room = rooms_sample.find(
    (room) => room.id === parseInt(id) && boardingCategories.includes(room.category)
  );

  if (!room) {
    return <h2>Không tìm thấy phòng trọ phù hợp!</h2>;
  }

  return (
    <div className="light-gray-background pb-6">
      <div className="container">

        <div className="breadcrumb py-4">
          <nav className="text-sm text-gray-500 flex items-center">
            <Link to="/" className="hover:underline text-blue-800 mr-2 font-semibold">Trang chủ</Link> {"/"}
            <Link to="/boarding" className="hover:underline text-blue-800 mx-2 font-semibold">Phòng trọ</Link> {"/"}
            <span className="text-gray-400 font-semibold inline-block ml-2" title={room.title}>{room.title}</span>
          </nav>
        </div>

        <div className="bg-white rounded-md py-6">
          <div className="px-6">
            <div className="flex space-x-2">
              <span className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-xl text-sm font-semibold">Tin Vip</span>
              <span className="bg-blue-100 cursor-pointer text-blue-800 px-3 py-1 rounded-xl text-sm font-semibold">Phòng trọ</span>
              <span className="bg-blue-100 cursor-pointer text-blue-800 px-3 py-1 rounded-xl text-sm font-semibold">
                {room.address.split(", ").pop()}
              </span>
            </div>
          </div>

          <div className="px-6 my-3">
            <h3 className="text-lg truncate uppercase font-bold" title={room.title}>
              {room.title}
            </h3>
          </div>

          <div className='flex items-center mt-1 px-6 mb-4'>
            <IoLocationSharp className="mr-1 text-gray-400" size={25} />
            <p className="text-gray-400  truncate" title={room.address}>
              {room.address}
            </p>
          </div>

          <ImageGridGallery images={room.img_links} />

          <div className="px-6 flex flex-row justify-between my-3">
            <div>
              <p className="text-sm text-gray-400">Giá chỉ từ</p>
              <p className='text-xl font-bold text-orange-600'>{room.price.toLocaleString()} VND/tháng</p>
            </div>

            <div
              className="cursor-pointer rounded-sm px-4 py-2 bg-orange-600 text-white flex items-center justify-center gap-2 
    hover:bg-orange-700 hover:shadow-md transition-all duration-200"
            >
              <FaPhoneAlt />
              <p>Ở ngay: {room.contact_phone}</p>
            </div>
          </div>

          <div className="px-6 py-4">
            <div class="border-t border-b border-gray-200 py-3">
              <h1 class="text-xl font-semibold">Thông tin</h1>
              <ul className="text-gray-700 grid grid-cols-3">
                {[
                  {
                    icon: <FaHome />, text: translateHousingCategory(room.category)
                  },
                  {
                    icon: <FaDollarSign />, text: room.price.toLocaleString() + " VNĐ/tháng"
                  },
                  { icon: <IoMdPerson />, text: "Người đăng: " + room.contact_fullname },
                  { icon: <FaPhoneAlt />, text: room.contact_phone },
                  { icon: <MdOutlineEmail />, text: room.contact_email },
                  { icon: <FaClock />, text: "Thời điểm đăng: " + "" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-blue-800">
                      {item.icon}
                    </div>
                    <span className="hover:text-blue-600 cursor-pointer transition">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* description */}
          <div className="px-6 pb-4">
            <div class="border-b border-gray-200 pb-4">
              <h1 class="text-xl font-semibold">Giới thiệu</h1>

              <pre style={{ fontFamily: "Roboto, sans-serif" }}>{room.description}</pre>

            </div>
          </div>

          {/* objects */}
          <div className="px-6 pb-4">
            <div class="border-b border-gray-200 pb-4">
              <h1 class="text-xl font-semibold">Đối tượng</h1>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {room.objects &&
                  room.objects.map((object, index) => (
                    <ObjectIcon key={index} name={object} />
                  ))}
              </div>
            </div>
          </div>

          {/* Utilities */}
          <div className="px-6 pb-4">
            <div class="border-b border-gray-200 pb-4">
              <h1 class="text-xl font-semibold">Tiện nghi</h1>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {room.utilities &&
                  room.utilities.map((utility, index) => (
                    <UtilityIcon key={index} name={utility} />
                  ))}
              </div>
            </div>
          </div>

          {/* environments */}
          <div className="px-6 pb-4">
            <div class="border-b border-gray-200 pb-4">
              <h1 class="text-xl font-semibold">Môi trường xung quanh</h1>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {room.environments &&
                  room.environments.map((environment, index) => (
                    <EnvironmentIcon key={index} name={environment} />
                  ))}
              </div>
            </div>
          </div>

          {/* address */}
          <div className="px-6">
            <div class="">
              <h1 class="text-xl font-semibold">Đường đi</h1>
              <div className="w-full mt-4">
                <img
                  src={address_guide}
                  alt="address guide"
                  className="w-full h-100 object-cover rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default BoardingDetail;
