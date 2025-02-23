// components/RevenueChart.js
import { Bar } from "react-chartjs-2";

const RevenueChart = ({ totalAmount }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Gói nâng hội viên",
        data: totalAmount,
        backgroundColor: "#0096fe",
        maxBarThickness: 15,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Tổng doanh thu",
            color: "#333", // Title color
            align: "start",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial",
            },
          },
          legend: {
            position: "bottom",
            labels: {
              color: "#444", // Legend text color
              font: {
                size: 12,
              },
              boxWidth: 20,
              usePointStyle: true,
            },
          },
        },
      }}
    />
  );
};

export default RevenueChart;
