import React from "react";
import { Link, useParams } from "react-router-dom";
import { boardingCategories, rooms_sample } from "../../utils/constants";

function BoardingDetail() {
  const { id } = useParams();

  const room = rooms_sample.find(
    (room) => room.id === parseInt(id) && boardingCategories.includes(room.category)
  );

  if (!room) {
    return <h2>Không tìm thấy phòng trọ phù hợp!</h2>;
  }

  return (
    <div className="light-gray-background">
      <div className="container">

        <div className="breadcrumb py-4">
          <nav className="text-sm text-gray-500 flex items-center">
            <Link to="/" className="hover:underline text-blue-800 mr-2 font-semibold">Trang chủ</Link> {"/"}
            <Link to="/boarding" className="hover:underline text-blue-800 mx-2 font-semibold">Phòng trọ</Link> {"/"}
            <span className="text-gray-400 font-semibold inline-block ml-2" title={room.title}>{room.title}</span>
          </nav>
        </div>

        <div className="bg-white rounded-md">asd</div>

      </div>
    </div>
  );
}

export default BoardingDetail;
