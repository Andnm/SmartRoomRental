// components/TopServices.js

import { AiOutlineBarChart, AiFillTag } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { PiExport } from "react-icons/pi";

const TodaySalesSummary = ({ saleData }) => {
  const summaryData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#fb597e",
      value: `${saleData?.income?.totalIncomeCurrent} VNĐ`, 
      label: "Tổng doanh số",
      scale: saleData?.income?.differencePercent, 
      scaleType: saleData?.income?.differencePercent >= 0 ? "+" : "-", 
      backGroundColor: "#ffe2e6",
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#bf84ff",
      value: saleData?.newUsers?.totalNewUsersCurrent, 
      label: "Khách hàng mới",
      scale: saleData?.newUsers?.differencePercent, 
      scaleType: saleData?.newUsers?.differencePercent >= 0 ? "+" : "-", 
      backGroundColor: "#f4e8fe",
    },
  ];

  const renderCard = (item, key) => {
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
          {item.scale}% so với hôm qua
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="summary_header">
        <p>Số liệu hôm nay</p>
        <button>
          {" "}
          <PiExport />
          Xuất
        </button>
      </div>
      <div className="summary_item_container">
        {summaryData.map((item, key) => renderCard(item, key))}
      </div>
    </>
  );
};

export default TodaySalesSummary;
