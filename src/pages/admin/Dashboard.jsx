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
} from "../../services/statistic.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";

ChartJS.register(...registerables);

const Dashboard = () => {
  const userData = useSelector(userSelector);

  const [saleData, setSaleData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseSale = await getStatisticSale();
          const responseMonthly = await getStatisticMonthly(2025);

          setSaleData(responseSale);
          setMonthlyData(responseMonthly);

          console.log("responseSale: ", responseSale);
          console.log("responseMonthly: ", responseMonthly);
        } catch (error) {
          toast.error("There was an error loading data!");
          toast.error(error.response?.data?.message || error.message);
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
        <div className="dashboard">
          {saleData && monthlyData && (
            <>
              {/* <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8"> */}
              <div className="today_sales_summary dashboard_boxshadow">
                <TodaySalesSummary saleData={saleData} />
              </div>
              <div className="visitors_Chart dashboard_boxshadow">
                <VisitorsChart
                  countUsers={monthlyData.countUsers}
                  countTransactions={monthlyData.countTransactions}
                />
              </div>
              <div className="revenue_chart dashboard_boxshadow">
                <RevenueChart totalAmount={monthlyData.totalAmount} />
              </div>
              {/* <div className="satisfaction_chart dashboard_boxshadow">
                <SatisfactionChart />
              </div> */}
              {/* <div className="goals_chart dashboard_boxshadow">
                <GoalsChart />
              </div> */}
              <div className="top_services dashboard_boxshadow">
                <TopServices />
              </div>
              {/* <div className="world_map dashboard_boxshadow">
                <WorldMap />
              </div>
              <div className="volume_service_level dashboard_boxshadow">
                <VolumeServiceLevel />
              </div> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
