import React, { useEffect } from "react";
import {
  FaUserGraduate,
  FaBriefcase,
  FaHome,
  FaHeart,
  FaStore,
  FaHospital,
  FaTree,
  FaWifi,
  FaToilet,
  FaShower,
  FaUtensils,
  FaTshirt,
  FaSnowflake,
  FaBed,
  FaCar,
  FaBus,
  FaChalkboardTeacher,
  FaUsers,
  FaHotel,
  FaChartPie,
  FaListUl,
  FaComments,
  FaHistory,
  FaDollarSign,
  FaCrown,
} from "react-icons/fa";
import {
  MdShoppingCart,
  MdLocalGroceryStore,
  MdLocalLaundryService,
  MdOutlineSecurity,
  MdDirectionsTransit,
  MdOutlineRequestPage,
} from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { AiOutlineApartment, AiOutlineDashboard } from "react-icons/ai";
import { toast } from "react-toastify";
import { ROLE_ADMIN } from "./constants";

export const formatCurrencyToVND = (input) => {
  const amount = typeof input === "string" ? parseFloat(input) : input;

  if (isNaN(amount)) {
    throw new Error(
      "Invalid input value. Please enter a number or string containing numbers."
    );
  }

  const formattedAmount = amount.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedAmount;
};

export function formatDateTimeVN(isoString) {
  const date = new Date(isoString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };

  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  const formattedParts = formatter.formatToParts(date);

  const time = `${formattedParts.find((p) => p.type === "hour").value}:${
    formattedParts.find((p) => p.type === "minute").value
  }`;

  const dateStr = `${formattedParts.find((p) => p.type === "day").value}/${
    formattedParts.find((p) => p.type === "month").value
  }/${formattedParts.find((p) => p.type === "year").value}`;

  return `${time} | ${dateStr}`;
}

export const sliderMenu = [
  {
    key: "dashboard",
    icon: <AiOutlineDashboard />,
    label: "Thống kê",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-user",
    icon: <BiSolidUserAccount />,
    label: "Người dùng",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-room",
    icon: <FaHotel />,
    label: "Phòng trọ",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-transaction",
    icon: <MdOutlineRequestPage />,
    label: "Giao dịch",
    roles: [ROLE_ADMIN],
  },
];

export const filterMenuByRole = (menu, role) => {
  if (!role) return [];
  return menu.filter((item) => item.roles.some((r) => r.name === role.name));
};

export const options_post_list = [
  {
    name: "Phòng trọ",
    des: "Chỗ ở sạch sẽ, an ninh, giá hợp lý, thích hợp cho sinh viên và người đi làm.",
    link: "",
    value: "post_room",
    icon: <FaHome size={80} color="#1E40AF" />,
  },
  {
    name: "Tìm bạn ở ghép",
    des: "Tìm bạn ở ghép, chung cư sạch đẹp, an ninh tốt...",
    link: "",
    value: "looking_for_roommates",
    icon: <FaUsers size={80} color="#1E40AF" />,
  },
];

export const innkeeper_menu = [
  { name: "Thông tin chung", icon: <FaChartPie />, path: "/innkeeper" },
  { name: "Quản lý trọ", icon: <FaListUl />, path: "/manage-boarding" },
  { name: "Quản lý đánh giá", icon: <FaComments />, path: "/reviews" },
  { name: "Lịch sử", icon: <FaHistory />, path: "/history" },
  { name: "Bảng phí đăng tin", icon: <FaDollarSign />, path: "/pricing" },
  { name: "Gói hội viên", icon: <FaCrown />, path: "/membership" },
];

export const objectLabels = ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"];

export const environmentLabels = [
  "Chợ",
  "Siêu thị",
  "Bệnh viện",
  "Công viên",
  "Trường học",
  "Trung tâm GDTT",
  "Bến xe bus",
];

export const utilityLabels = [
  "Wifi",
  "Vệ sinh trong",
  "Phòng tắm",
  "Kệ bếp",
  "Máy giặt",
  "Điều hòa",
  "Tủ lạnh",
  "Giường nệm",
  "Tủ áo quần",
  "Bãi để xe riêng",
  "Camera an ninh",
];

export const iconMap = {
  objects: {
    "Đi học": <FaUserGraduate />,
    "Đi làm": <FaBriefcase />,
    "Gia đình": <FaHome />,
    "Cặp đôi": <FaHeart />,
  },
  environments: {
    Chợ: <FaStore />,
    "Siêu thị": <MdShoppingCart />,
    "Bệnh viện": <FaHospital />,
    "Công viên": <FaTree />,
    "Trường học": <FaChalkboardTeacher />,
    "Trung tâm GDTT": <MdDirectionsTransit />,
    "Bến xe bus": <FaBus />,
  },
  utilities: {
    Wifi: <FaWifi />,
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

export const ObjectIcon = ({ name }) => (
  <IconComponent category="objects" name={name} />
);
export const EnvironmentIcon = ({ name }) => (
  <IconComponent category="environments" name={name} />
);
export const UtilityIcon = ({ name }) => (
  <IconComponent category="utilities" name={name} />
);

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

export const generateFallbackAvatar = (fullname) => {
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

export const toastError = (error) => {
  const messages = error?.response?.data?.message;

  if (Array.isArray(messages)) {
    const combinedMessage = messages.join("\n");
    toast.error(combinedMessage);
  } else {
    toast.error(messages || error.message || "An error occurred");
  }
};
