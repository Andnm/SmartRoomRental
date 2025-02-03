import React from "react";
import { useParams } from "react-router-dom";
import { apartmentFullHouseCategories, rooms_sample } from "../../utils/constants";

function ApartmentFullHouseDetail() {

  const { id } = useParams();
  const room = rooms_sample.find(
    (room) => room.id === parseInt(id) && apartmentFullHouseCategories.includes(room.category)
  );

  if (!room) {
    return <h2>Không tìm thấy chung cư/nhà nguyên căn phù hợp!</h2>;
  }

  return <div>ApartmentFullHouseDetail</div>;
}

export default ApartmentFullHouseDetail;
