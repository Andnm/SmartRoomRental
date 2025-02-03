import React, { useEffect } from "react";
import { FaUserGraduate, FaBriefcase, FaHome, FaHeart, FaStore, FaHospital, FaTree, FaWifi, FaToilet, FaShower, FaUtensils, FaTshirt, FaSnowflake, FaBed, FaCar, FaCamera, FaBus, FaChalkboardTeacher } from "react-icons/fa";
import { MdShoppingCart, MdLocalGroceryStore, MdLocalLaundryService, MdOutlineSecurity, MdDirectionsTransit } from "react-icons/md";
import { AiOutlineApartment } from "react-icons/ai";

const iconMap = {
  objects: {
    "Đi học": <FaUserGraduate />,
    "Đi làm": <FaBriefcase />,
    "Gia đình": <FaHome />,
    "Cặp đôi": <FaHeart />,
  },
  environments: {
    "Chợ": <FaStore />,
    "Siêu thị": <MdShoppingCart />,
    "Bệnh viện": <FaHospital />,
    "Công viên": <FaTree />,
    "Trường học": <FaChalkboardTeacher />,
    "Trung tâm GDTT": <MdDirectionsTransit />,
    "Bến xe bus": <FaBus />,
  },
  utilities: {
    "Wifi": <FaWifi />,
    "Vệ sinh trong": <FaToilet />,
    "Phòng tắm": <FaShower />,
    "Kệ bếp": <FaUtensils />,
    "Máy giặt": <MdLocalLaundryService />,
    "Điều hòa": <FaSnowflake />,
    "Tủ lạnh": <MdLocalGroceryStore />,
    "Giường nệm": <FaBed />,
    "Tủ áo quần": <FaTshirt />,
    "Bãi để xe riêng": <FaCar />,
    "Camera an ninh": <MdOutlineSecurity />,
  },
};

const IconComponent = ({ category, name }) => {
  const icon = iconMap[category]?.[name] || <AiOutlineApartment />;
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xl text-gray-500">{icon}</span>
      <span>{name}</span>
    </div>
  );
};

export const ObjectIcon = ({ name }) => <IconComponent category="objects" name={name} />;
export const EnvironmentIcon = ({ name }) => <IconComponent category="environments" name={name} />;
export const UtilityIcon = ({ name }) => <IconComponent category="utilities" name={name} />;

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, []);
}