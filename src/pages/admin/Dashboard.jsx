import TodaySalesSummary from "../../components/dashboard/dashboardChart/TodaySalesSummary";
import VisitorsChart from "../../components/dashboard/dashboardChart/VisitorsChart";
import RevenueChart from "../../components/dashboard/dashboardChart/RevenueChart";
import GoalsChart from "../../components/dashboard/dashboardChart/GoalsChart";
import TopServices from "../../components/dashboard/dashboardChart/TopServices";
import "../../components/dashboard/style/dashboard.scss";
import { Chart as ChartJS, registerables } from "chart.js";
import SatisfactionChart from "../../components/dashboard/dashboardChart/SatisfactionChart ";
import WorldMap from "../../components/dashboard/dashboardChart/WorldMap";
import VolumeServiceLevel from "../../components/dashboard/dashboardChart/VolumeServiceLevel";
import { userSelector } from "../../redux/selectors/selector";
import { useSelector } from "react-redux";
import {
  getStatisticMonthly,
  getStatisticSale,
  getStatisticSaleMonth,
} from "../../services/statistic.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { getAllTransactionByAdmin } from "../../services/transaction.services";
import WeeklyRevenueChart from "../../components/dashboard/dashboardChart/WeeklyRevenueChart";
import { getAllRoomsByAdmin } from "../../services/room.services";

ChartJS.register(...registerables);

const Dashboard = () => {
  const userData = useSelector(userSelector);

  const [saleData, setSaleData] = useState(null);
  const [saleMonthData, setSaleMonthData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseSale = await getStatisticSale();
          const responseSaleMonth = await getStatisticSaleMonth();
          const responseMonthly = await getStatisticMonthly(2025);
          const responseTransaction = await getAllTransactionByAdmin();
          const responseGetAllRooms = await getAllRoomsByAdmin();

          setSaleData(responseSale);
          setSaleMonthData(responseSaleMonth)
          setMonthlyData(responseMonthly);
          setTransactionData(responseTransaction)
          setRoomData(responseGetAllRooms)

        } catch (error) {
          // toast.error("There was an error loading data!");
          // toast.error(error.response?.data?.message || error.message);
          console.error("There was an error loading data!:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItems();
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center w-full h-screen">
          <Spin spinning={isLoading} />
        </div>
      ) : (
        <>
          <div className="dashboard">
            {saleData && monthlyData && (
              <>
                {/* <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8"> */}
                <div className="today_sales_summary dashboard_boxshadow">
                  <TodaySalesSummary saleData={saleData} saleMonthData={saleMonthData} transactionData={transactionData} roomData={roomData}/>
                </div>
                <div className="visitors_Chart dashboard_boxshadow top_services">
                  <VisitorsChart
                    countUsers={monthlyData.countUsers}
                    countTransactions={monthlyData.countTransactions}
                    transactionData={transactionData}
                  />
                </div>
                {/* <div className="revenue_chart dashboard_boxshadow">
                  <RevenueChart totalAmount={monthlyData.totalAmount} />
                </div> */}
              </>
            )}
          </div>

          <div className="weekly-revenue-chart dashboard_boxshadow shadow-md">
            <WeeklyRevenueChart transactionData={transactionData} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
