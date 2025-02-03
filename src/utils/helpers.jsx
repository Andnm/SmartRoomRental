import React, { useEffect } from "react";
import { FaUserGraduate, FaBriefcase, FaHome, FaHeart, FaStore, FaHospital, FaTree, FaWifi, FaToilet, FaShower, FaUtensils, FaTshirt, FaSnowflake, FaBed, FaCar, FaBus, FaChalkboardTeacher } from "react-icons/fa";
import { MdShoppingCart, MdLocalGroceryStore, MdLocalLaundryService, MdOutlineSecurity, MdDirectionsTransit } from "react-icons/md";
import { AiOutlineApartment } from "react-icons/ai";
import { toast } from "react-toastify";

export const iconMap = {
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

export const handleActionNotSupport = () => {
  toast.warning("Tính năng chưa hỗ trợ");
};

export const handleLowerCaseNonAccentVietnamese = (str) => {
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const generateFallbackAvatar = (
  fullname
) => {
  const fallbackColor = "#FF9966";

  const initials = handleLowerCaseNonAccentVietnamese(
    fullname?.charAt(0).toUpperCase() || ""
  );

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="${fallbackColor}" />
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50">
        ${initials}
      </text>
    </svg>
  `;
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  return dataUrl;
};