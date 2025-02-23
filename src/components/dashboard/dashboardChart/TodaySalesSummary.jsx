// components/TopServices.js

import { AiOutlineBarChart, AiFillTag } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { PiExport } from "react-icons/pi";
import { formatPrice } from "../../../utils/common";

const TodaySalesSummary = ({ saleData, saleMonthData }) => {
  const todaySaleData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#fb597e", // Hồng đậm
      value: `${formatPrice(saleData?.income?.totalIncomeCurrent)} VNĐ`,
      label: "Tổng doanh số",
      scale: saleData?.income?.differencePercent,
      scaleType: saleData?.income?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#ffe2e6", // Hồng nhạt
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#bf84ff", // Tím
      value: saleData?.newUsers?.totalNewUsersCurrent,
      label: "Khách hàng mới",
      scale: saleData?.newUsers?.differencePercent,
      scaleType: saleData?.newUsers?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#f4e8fe", // Tím nhạt
    },
    {
      icon: <FaHome size={24} color="white" />,
      iconBackGroundColor: "#4caf50", // Xanh lá
      value: saleData?.postRoomDifferencePercent?.totalPostRoomCurrent,
      label: "Đăng phòng",
      scale: saleData?.postRoomDifferencePercent?.differencePercent,
      scaleType: saleData?.postRoomDifferencePercent?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#d0f0c0", // Xanh lá nhạt
    },
    {
      icon: <FaUserFriends size={24} color="white" />,
      iconBackGroundColor: "#2196f3", // Xanh dương
      value: saleData?.lookingForRoomDifferencePercent?.totalLookingForRoomCurrent,
      label: "Tìm bạn ở chung",
      scale: saleData?.lookingForRoomDifferencePercent?.differencePercent,
      scaleType: saleData?.lookingForRoomDifferencePercent?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#cce7ff", // Xanh dương nhạt
    },
];

const monthSaleData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#ffa726", // Cam đậm
      value: `${formatPrice(saleMonthData?.income?.totalIncomeCurrent)} VNĐ`,
      label: "Tổng doanh số",
      scale: saleMonthData?.income?.differencePercent,
      scaleType: saleMonthData?.income?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#ffe0b2", // Cam nhạt
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#009688", // Xanh ngọc
      value: saleMonthData?.newUsers?.totalNewUsersCurrent,
      label: "Khách hàng mới",
      scale: saleMonthData?.newUsers?.differencePercent,
      scaleType: saleMonthData?.newUsers?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#b2dfdb", // Xanh ngọc nhạt
    },
    {
      icon: <FaHome size={24} color="white" />,
      iconBackGroundColor: "#795548", // Nâu
      value: saleMonthData?.postRoomDifferencePercent?.totalPostRoomCurrent,
      label: "Đăng phòng",
      scale: saleMonthData?.postRoomDifferencePercent?.differencePercent,
      scaleType: saleMonthData?.postRoomDifferencePercent?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#d7ccc8", // Nâu nhạt
    },
    {
      icon: <FaUserFriends size={24} color="white" />,
      iconBackGroundColor: "#9c27b0", // Tím đậm
      value: saleMonthData?.lookingForRoomDifferencePercent?.totalLookingForRoomCurrent,
      label: "Tìm bạn ở chung",
      scale: saleMonthData?.lookingForRoomDifferencePercent?.differencePercent,
      scaleType: saleMonthData?.lookingForRoomDifferencePercent?.differencePercent >= 0 ? "+" : "-",
      backGroundColor: "#e1bee7", // Tím nhạt
    },
];

  const renderCard = (item, key, isMonthData) => {
    return (
      <div
        className="summary_card"
        style={{ backgroundColor: item.backGroundColor }}
        key={key}
      >
        <div
          className="summary_card_icon"
          style={{ backgroundColor: item.iconBackGroundColor }}
        >
          {item.icon}
        </div>
        <div className="summary_card_value">{item.value}</div>
        <div className="summary_card_label">{item.label}</div>
        <div className="summary_card_scale">
          {item.scaleType}
          {item.scale}% {isMonthData ? "so với tháng trước" : "so với hôm qua"}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="summary_header">
        <p>Số liệu kinh doanh</p>
        <button>
          <PiExport />
          Xuất
        </button>
      </div>
      <h1 className="text-lg font-bold">Hôm nay</h1>
      <div className="summary_item_container">
        {todaySaleData.map((item, key) => renderCard(item, key, false))}
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-bold">Tháng này</h1>
        <div className="summary_item_container">
          {monthSaleData.map((item, key) => renderCard(item, key, true))}
        </div>
      </div>
    </>
  );
};

export default TodaySalesSummary;
