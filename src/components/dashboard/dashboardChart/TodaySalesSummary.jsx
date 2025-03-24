// components/TodaySalesSummary.js

import { AiOutlineBarChart, AiFillTag } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { PiExport } from "react-icons/pi";
import { formatPrice } from "../../../utils/common";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/vi";

// Cấu hình plugin cho dayjs
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.locale("vi");

const TodaySalesSummary = ({ saleData, saleMonthData, transactionData }) => {
  const [transactionStats, setTransactionStats] = useState({
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    todayPercentage: 0,
    monthPercentage: 0
  });

  useEffect(() => {
    if (transactionData && transactionData.length > 0) {
      // Lấy thời gian hiện tại
      const now = dayjs();
      
      // Tính toán ngày hôm nay, hôm qua, tháng này, tháng trước
      const today = now.startOf('day');
      const yesterday = today.subtract(1, 'day');
      const endOfToday = today.endOf('day');
      const endOfYesterday = yesterday.endOf('day');
      
      const thisMonth = now.startOf('month');
      const lastMonth = thisMonth.subtract(1, 'month');
      const endOfThisMonth = now.endOf('month');
      const endOfLastMonth = lastMonth.endOf('month');
      
      // Đếm số giao dịch
      let todayTransactions = 0;
      let yesterdayTransactions = 0;
      let thisMonthTransactions = 0;
      let lastMonthTransactions = 0;
      
      // Tính tổng số tiền
      let todayAmount = 0;
      let yesterdayAmount = 0;
      let thisMonthAmount = 0;
      let lastMonthAmount = 0;
      
      transactionData.forEach(transaction => {
        const transactionDate = dayjs(transaction.createdAt);
        const amount = transaction.amount || 0;
        
        // Kiểm tra giao dịch thuộc ngày nào
        if (transactionDate.isBetween(today, endOfToday, null, '[]')) {
          todayTransactions++;
          todayAmount += amount;
        } else if (transactionDate.isBetween(yesterday, endOfYesterday, null, '[]')) {
          yesterdayTransactions++;
          yesterdayAmount += amount;
        }
        
        // Kiểm tra giao dịch thuộc tháng nào
        if (transactionDate.isBetween(thisMonth, endOfThisMonth, null, '[]')) {
          thisMonthTransactions++;
          thisMonthAmount += amount;
        } else if (transactionDate.isBetween(lastMonth, endOfLastMonth, null, '[]')) {
          lastMonthTransactions++;
          lastMonthAmount += amount;
        }
      });
      
      // Tính phần trăm tăng/giảm
      const calculatePercentage = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
      };
      
      const todayPercentage = calculatePercentage(todayTransactions, yesterdayTransactions);
      const monthPercentage = calculatePercentage(thisMonthTransactions, lastMonthTransactions);
      
      // Cập nhật state
      setTransactionStats({
        today: todayTransactions,
        yesterday: yesterdayTransactions,
        thisMonth: thisMonthTransactions,
        lastMonth: lastMonthTransactions,
        todayAmount,
        yesterdayAmount,
        thisMonthAmount,
        lastMonthAmount,
        todayPercentage,
        monthPercentage
      });
    }
  }, [transactionData]);

  const todaySaleData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#fb597e", // Hồng đậm
      value: `${formatPrice(transactionStats.todayAmount || saleData?.income?.totalIncomeCurrent)} VNĐ`,
      label: "Tổng doanh số",
      scale: Math.round(transactionStats.todayAmount ? transactionStats.todayPercentage : (saleData?.income?.differencePercent || 0)),
      scaleType: transactionStats.todayAmount ? (transactionStats.todayPercentage >= 0 ? "+" : "") : (saleData?.income?.differencePercent >= 0 ? "+" : ""),
      backGroundColor: "#ffe2e6", // Hồng nhạt
    },
    {
      icon: <FaUserFriends size={24} color="white" />,
      iconBackGroundColor: "#2196f3", // Xanh dương
      value: transactionStats.today || saleData?.lookingForRoomDifferencePercent?.totalLookingForRoomCurrent,
      label: "Số lượng giao dịch",
      scale: Math.round(transactionStats.today ? transactionStats.todayPercentage : (saleData?.lookingForRoomDifferencePercent?.differencePercent || 0)),
      scaleType: transactionStats.today ? (transactionStats.todayPercentage >= 0 ? "+" : "") : (saleData?.lookingForRoomDifferencePercent?.differencePercent >= 0 ? "+" : ""),
      backGroundColor: "#cce7ff", // Xanh dương nhạt
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#bf84ff", // Tím
      value: saleData?.newUsers?.totalNewUsersCurrent,
      label: "Khách hàng mới",
      scale: Math.round(saleData?.newUsers?.differencePercent || 0),
      scaleType: saleData?.newUsers?.differencePercent >= 0 ? "+" : "",
      backGroundColor: "#f4e8fe", // Tím nhạt
    },
    {
      icon: <FaHome size={24} color="white" />,
      iconBackGroundColor: "#4caf50", // Xanh lá
      value: saleData?.postRoomDifferencePercent?.totalPostRoomCurrent,
      label: "Đăng phòng",
      scale: Math.round(saleData?.postRoomDifferencePercent?.differencePercent || 0),
      scaleType: saleData?.postRoomDifferencePercent?.differencePercent >= 0 ? "+" : "",
      backGroundColor: "#d0f0c0", // Xanh lá nhạt
    },
  ];

  const monthSaleData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#ffa726", // Cam đậm
      value: `${formatPrice(transactionStats.thisMonthAmount || saleMonthData?.income?.totalIncomeCurrent)} VNĐ`,
      label: "Tổng doanh số",
      scale: Math.round(transactionStats.thisMonthAmount ? transactionStats.monthPercentage : (saleMonthData?.income?.differencePercent || 0)),
      scaleType: transactionStats.thisMonthAmount ? (transactionStats.monthPercentage >= 0 ? "+" : "") : (saleMonthData?.income?.differencePercent >= 0 ? "+" : ""),
      backGroundColor: "#ffe0b2", // Cam nhạt
    },
    {
      icon: <FaUserFriends size={24} color="white" />,
      iconBackGroundColor: "#9c27b0", // Tím đậm
      value: transactionStats.thisMonth || saleMonthData?.lookingForRoomDifferencePercent?.totalLookingForRoomCurrent,
      label: "Số lượng giao dịch",
      scale: Math.round(transactionStats.thisMonth ? transactionStats.monthPercentage : (saleMonthData?.lookingForRoomDifferencePercent?.differencePercent || 0)),
      scaleType: transactionStats.thisMonth ? (transactionStats.monthPercentage >= 0 ? "+" : "") : (saleMonthData?.lookingForRoomDifferencePercent?.differencePercent >= 0 ? "+" : ""),
      backGroundColor: "#e1bee7", // Tím nhạt
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#009688", // Xanh ngọc
      value: saleMonthData?.newUsers?.totalNewUsersCurrent,
      label: "Khách hàng mới",
      scale: Math.round(saleMonthData?.newUsers?.differencePercent || 0),
      scaleType: saleMonthData?.newUsers?.differencePercent >= 0 ? "+" : "",
      backGroundColor: "#b2dfdb", // Xanh ngọc nhạt
    },
    {
      icon: <FaHome size={24} color="white" />,
      iconBackGroundColor: "#795548", // Nâu
      value: saleMonthData?.postRoomDifferencePercent?.totalPostRoomCurrent,
      label: "Đăng phòng",
      scale: Math.round(saleMonthData?.postRoomDifferencePercent?.differencePercent || 0),
      scaleType: saleMonthData?.postRoomDifferencePercent?.differencePercent >= 0 ? "+" : "",
      backGroundColor: "#d7ccc8", // Nâu nhạt
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
          {Math.abs(item.scale).toFixed(0)}% {isMonthData ? "so với tháng trước" : "so với hôm qua"}
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