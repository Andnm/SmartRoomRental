// components/VisitorsChart.js
import { Line } from "react-chartjs-2";
import { convertMembership } from "../../../utils/common";

const VisitorsChart = ({ countUsers, countTransactions, transactionData }) => {
  const currentMonth = new Date().getMonth();

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
    ].slice(0, currentMonth + 1),
    datasets: [
      {
        label: "Khách hàng mới",
        data: countUsers.slice(0, currentMonth + 1),
        borderColor: "#ed6a69",
        backgroundColor: "#ed6a69",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#ed6a69",
        pointRadius: 0,
      },
      {
        label: "Số lượng giao dịch",
        data: countTransactions.slice(0, currentMonth + 1),
        borderColor: "#4cd660",
        backgroundColor: "#4cd660",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#4cd660",
        pointRadius: 0,
      },
    ],
  };

  const transactionCount = transactionData.reduce(
    (acc, { transaction_type }) => {
      acc[transaction_type] = (acc[transaction_type] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalTransactions = transactionData.length;
  const dataTopServices = [
    { name: "up_membership", color: "#1299fa" },
    { name: "add_funds", color: "#26dfa0" },
    { name: "post_room", color: "#8554e6" },
    { name: "looking_for_roommates", color: "#fe8f0e" },
  ].map((item) => {
    const count = transactionCount[item.name] || 0;
    const popularity = (count / totalTransactions) * 100;
    return {
      name: convertMembership(item.name),
      popularity: popularity.toFixed(0),
      color: item.color,
    };
  });

  dataTopServices.sort((a, b) => b.popularity - a.popularity);

  return (
    <>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Lượt ghé thăm",
              color: "#333",
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
                color: "#444",
                font: {
                  size: 12,
                },
                boxWidth: 12,
                padding: 15,
                generateLabels: (chart) => {
                  const originalLabels = chart.data.datasets.map(
                    (dataset, i) => ({
                      text: dataset.label,
                      fillStyle: dataset.borderColor, // Set box background color to border color
                      strokeStyle: dataset.borderColor,
                      lineWidth: 2,
                      hidden: !chart.isDatasetVisible(i),
                      datasetIndex: i,
                    })
                  );
                  return originalLabels;
                },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                title: (tooltipItems) => `Month: ${tooltipItems[0].label}`,
                label: (tooltipItem) => {
                  const datasetLabel = tooltipItem.dataset.label || "";
                  const value = tooltipItem.raw;
                  return `${datasetLabel}: ${value}`;
                },
              },
            },
          },
          interaction: {
            intersect: false,
          },
        }}
      />

      <>
        <div className="summary_header mt-4">
          <p>Top dịch vụ</p>
        </div>
        <table>
          <thead>
            <tr>
              <th className="summary_table_header">#</th>
              <th className="summary_table_header">Tên</th>
              <th className="summary_table_header">Độ phổ biến</th>
              <th className="summary_table_header">Đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {dataTopServices.map((item, index) => (
              <tr key={index}>
                <td className="summary_table_text">{index + 1}</td>
                <td className="summary_table_text">{item.name}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${item.popularity}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className="summary_table_value"
                    style={{
                      borderColor: item.color,
                      // backgroundColor: item.color,
                      color: item.color,
                      backgroundColor: `rgba(${parseInt(
                        item.color.slice(1, 3),
                        16
                      )}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(
                        item.color.slice(5, 7),
                        16
                      )}, 0.1)`,
                    }}
                  >
                    {item.popularity}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};

export default VisitorsChart;
