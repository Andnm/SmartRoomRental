import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaDollarSign, FaFilter } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import VerticalFilter from '../../components/room/filter/VerticalFilter';
import { rooms_sample } from '../../utils/constants';
import HorizontalCardRoom from '../../components/room/roomCard/HorizontalCardRoom';

const itemsPerPage = 10;

function LookingForRoommatesList() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRooms = rooms_sample.filter(
    (room) => room.type === "looking_for_roommates"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className="bg-blue-800 justify-center flex items-center">
        <div className="bg-blue-800 p-5 rounded-br-lg rounded-tr-lg rounded-bl-lg flex space-x-3 justify-center" style={{ width: "1240px" }}>
          <div className="flex items-center bg-white rounded-bl-full rounded-tl-full rounded-br-md px-4 relative">
            <div className="absolute -left-1 w-14 h-14 flex items-center justify-center bg-[#00b7ff] shadow-lg rounded-full text-white hover:bg-[#009ace] cursor-pointer" style={{ boxShadow: "2px 3px 6px rgba(0, 183, 255, 0.5)" }}>
              <FaSearch size={20} />
            </div>
            <div className="w-8 h-0"></div>
            <input type="text" placeholder="Nhập phòng trọ,..." className="p-2 rounded-md outline-none w-46" />
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

      <div className='light-gray-background'>
        <div className='container py-6 flex flex-row justify-between'>
          <div>
            <h2 className='uppercase text-2xl font-semibold'>cho thuê chung cư/nhà nguyên căn giá rẻ, mới nhất</h2>

            <div className="breadcrumb pb-4">
              <nav className="text-sm text-gray-500 flex items-center">
                <Link to="/" className="hover:underline text-blue-800 mr-2 font-semibold">Trang chủ</Link> {"/"}
                <Link to="/apartment-fullhouse" className="hover:underline text-gray-400 mx-2 font-semibold">Chưng cư, nhà nguyên căn</Link>
              </nav>
            </div>

            <div className='px-2 mt-2'>
              <p className='font-semibold text-lg'>Tổng {filteredRooms.length} kết quả</p>

              <div className="grid grid-cols-1 gap-2 ml-2">
                {currentRooms.map((room, index) => (
                  <HorizontalCardRoom key={index} room={room} is_hot={false} />
                ))}
              </div>

              <div className='flex justify-center mt-4'>
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={filteredRooms.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>

          {/* filter */}
          <VerticalFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        </div>
      </div>
    </div>
  );
}

export default LookingForRoommatesList;
