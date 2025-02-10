import { Skeleton } from "antd";
import React from "react";

const SkeletonRoomCardLoading = ({ index }) => {
  return (
    <div className="p-2 rounded-lg w-full" key={index}>
      <Skeleton.Image
        active
        style={{ width: "278px", height: "160px", borderRadius: "8px" }}
      />
      <div className="py-2">
        <Skeleton active paragraph={{ rows: 0}} />
        <Skeleton.Button active style={{ width: "80px", marginRight: "8px" }} />
        <Skeleton.Button active style={{ width: "80px" }} />
        <Skeleton.Input active style={{ width: "100%", marginTop: "8px" }} />
      </div>
    </div>
  );
};

export default SkeletonRoomCardLoading;
