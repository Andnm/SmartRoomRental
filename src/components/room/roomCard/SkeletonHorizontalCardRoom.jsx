import React from "react";
import { Skeleton } from "antd";

const SkeletonHorizontalCardRoom = () => {
  return (
    <div className="p-2 rounded-lg transition-transform transform hover:scale-105 hover:shadow-md duration-300 w-230">
      <div className="rounded-lg flex flex-row gap-4">
        <div className="relative">
          <Skeleton.Image active className="h-40 w-40 rounded-lg" style={{height: "160px", width: "120px"}}/>      
        </div>

        <div className="py-2 w-full">
          <Skeleton.Input active size="small" className="w-40 h-4" style={{width: "500px"}}/>

          <div className="mt-2">
            <Skeleton.Button active size="small" className="w-32 h-5" style={{width: "100px"}} />
          </div>

          <div className="flex gap-2 text-xs text-gray-700 mt-3">
            <Skeleton.Button active size="small" className="w-20 h-5" style={{width: "70px"}}/>
            <Skeleton.Button active size="small" className="w-14 h-5" style={{width: "70px"}}/>
          </div>

          <div className="flex items-center mt-1">
            <Skeleton.Avatar size={20} shape="circle" style={{marginTop: "10px"}}/>
            <Skeleton.Input active size="small" className="ml-2 w-40 h-4" style={{width: "300px"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHorizontalCardRoom;
