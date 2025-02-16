import React from "react";
import InnkeeperLayout from "../../components/layout/InnkeeperLayout";

const History = () => {
  return (
    <InnkeeperLayout>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <div className="text-center text-gray-500 text-lg font-medium">
          Bạn chưa có lịch sử nào cả
        </div>
      </div>
    </InnkeeperLayout>
  );
};

export default History;
