import React, { useState, useEffect } from "react";
import { Select, DatePicker, Radio } from "antd";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const { Option } = Select;
const { WeekPicker, MonthPicker } = DatePicker;

const WeeklyRevenueChart = ({ transactionData }) => {
  const [viewMode, setViewMode] = useState("month"); // "week", "month", "year"
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filteredData, setFilteredData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  dayjs.locale("vi");

  const getWeekRange = (date) => {
    const startOfWeek = date.startOf("week");
    const endOfWeek = date.endOf("week");
    return { startOfWeek, endOfWeek };
  };

  const getMonthRange = (date) => {
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");
    return { startOfMonth, endOfMonth };
  };

  const getYearRange = (date) => {
    const startOfYear = date.startOf("year");
    const endOfYear = date.endOf("year");
    return { startOfYear, endOfYear };
  };

  const processWeekData = (date) => {
    if (!transactionData || transactionData.length === 0) return [];

    const { startOfWeek, endOfWeek } = getWeekRange(date);
    
    const weekDays = Array(7).fill(0).map((_, index) => {
      const day = startOfWeek.add(index, "day");
      return {
        date: day.format("YYYY-MM-DD"),
        label: day.format("DD/MM (ddd)"),
        amount: 0,
        count: 0,
      };
    });

    let weekTotal = 0;
    let transactionCount = 0;
    
    transactionData.forEach((transaction) => {
      const transactionDate = dayjs(transaction.createdAt);
      if (transactionDate.isBetween(startOfWeek, endOfWeek, null, "[]")) {
        const dayIndex = transactionDate.day();
        weekDays[dayIndex].amount += transaction.amount || 0;
        weekDays[dayIndex].count += 1;
        weekTotal += transaction.amount || 0;
        transactionCount += 1;
      }
    });

    setTotalRevenue(weekTotal);
    setTotalTransactions(transactionCount);
    
    return weekDays;
  };

  const processMonthData = (date) => {
    if (!transactionData || transactionData.length === 0) return [];

    const { startOfMonth, endOfMonth } = getMonthRange(date);
    const daysInMonth = endOfMonth.date();
    
    const monthDays = Array(daysInMonth).fill(0).map((_, index) => {
      const day = startOfMonth.add(index, "day");
      return {
        date: day.format("YYYY-MM-DD"),
        label: day.format("DD/MM"),
        amount: 0,
        count: 0,
      };
    });

    let monthTotal = 0;
    let transactionCount = 0;
    
    transactionData.forEach((transaction) => {
      const transactionDate = dayjs(transaction.createdAt);
      if (transactionDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
        const dayIndex = transactionDate.date() - 1;
        monthDays[dayIndex].amount += transaction.amount || 0;
        monthDays[dayIndex].count += 1;
        monthTotal += transaction.amount || 0;
        transactionCount += 1;
      }
    });

    setTotalRevenue(monthTotal);
    setTotalTransactions(transactionCount);
    
    return monthDays;
  };

  const processYearData = (date) => {
    if (!transactionData || transactionData.length === 0) return [];

    const { startOfYear, endOfYear } = getYearRange(date);
    
    const yearMonths = Array(12).fill(0).map((_, index) => {
      const month = startOfYear.add(index, "month");
      return {
        date: month.format("YYYY-MM"),
        label: month.format("MM/YYYY"),
        amount: 0,
        count: 0,
      };
    });

    let yearTotal = 0;
    let transactionCount = 0;
    
    transactionData.forEach((transaction) => {
      const transactionDate = dayjs(transaction.createdAt);
      if (transactionDate.isBetween(startOfYear, endOfYear, null, "[]")) {
        const monthIndex = transactionDate.month();
        yearMonths[monthIndex].amount += transaction.amount || 0;
        yearMonths[monthIndex].count += 1;
        yearTotal += transaction.amount || 0;
        transactionCount += 1;
      }
    });

    setTotalRevenue(yearTotal);
    setTotalTransactions(transactionCount);
    
    return yearMonths;
  };

  useEffect(() => {
    if (transactionData && transactionData.length > 0) {
      let processedData = [];
      
      switch (viewMode) {
        case "week":
          processedData = processWeekData(selectedDate);
          break;
        case "month":
          processedData = processMonthData(selectedDate);
          break;
        case "year":
          processedData = processYearData(selectedDate);
          break;
        default:
          processedData = processWeekData(selectedDate);
      }
      
      setFilteredData(processedData);
    }
  }, [transactionData, selectedDate, viewMode]);

  const chartData = {
    labels: filteredData.map((item) => item.label),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: filteredData.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString() + " VND";
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `Doanh thu: ${value.toLocaleString()} VND`;
          },
          afterLabel: function (context) {
            const index = context.dataIndex;
            return `Số giao dịch: ${filteredData[index].count}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderTitle = () => {
    switch (viewMode) {
      case "week":
        return "Doanh Thu Theo Ngày Trong Tuần";
      case "month":
        return "Doanh Thu Theo Ngày Trong Tháng";
      case "year":
        return "Doanh Thu Theo Tháng Trong Năm";
      default:
        return "Doanh Thu";
    }
  };

  const renderDatePicker = () => {
    switch (viewMode) {
      case "week":
        return (
          <WeekPicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Chọn tuần"
            format="YYYY-[Tuần]ww"
          />
        );
      case "month":
        return (
          <MonthPicker
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Chọn tháng"
            format="MM/YYYY"
          />
        );
      case "year":
        return (
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            picker="year"
            placeholder="Chọn năm"
            disabledDate={(current) => current && current.year() < 2025}
          />
        );
      default:
        return null;
    }
  };

  const renderTimeRangeInfo = () => {
    switch (viewMode) {
      case "week": {
        const { startOfWeek, endOfWeek } = getWeekRange(selectedDate);
        return `${startOfWeek.format("DD/MM/YYYY")} - ${endOfWeek.format("DD/MM/YYYY")}`;
      }
      case "month": {
        const { startOfMonth, endOfMonth } = getMonthRange(selectedDate);
        return `${startOfMonth.format("DD/MM/YYYY")} - ${endOfMonth.format("DD/MM/YYYY")}`;
      }
      case "year": {
        const { startOfYear, endOfYear } = getYearRange(selectedDate);
        return `${startOfYear.format("DD/MM/YYYY")} - ${endOfYear.format("DD/MM/YYYY")}`;
      }
      default:
        return "";
    }
  };

  return (
    <div className="weekly-revenue-chart">
      <div className="chart-header">
        <h2>{renderTitle()}</h2>
        <div className="date-filters">
          <Radio.Group value={viewMode} onChange={handleViewModeChange}>
            <Radio.Button value="week">Tuần</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>
          {renderDatePicker()}
        </div>
      </div>
      
      <div className="chart-summary">
        <div className="summary-item">
          <h3>Tổng doanh thu:</h3>
          <p>{totalRevenue.toLocaleString()} VND</p>
        </div>
        <div className="summary-item">
          <h3>Tổng giao dịch:</h3>
          <p>{totalTransactions}</p>
        </div>
        <div className="summary-item">
          <h3>Khoảng thời gian:</h3>
          <p>{renderTimeRangeInfo()}</p>
        </div>
      </div>
      
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} height={300} />
      </div>
    </div>
  );
};

export default WeeklyRevenueChart;
