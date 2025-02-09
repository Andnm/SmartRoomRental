"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import InnkeeperLayout from "../../components/layout/InnkeeperLayout";
import { toast } from "react-toastify";
import AddRoom from "../../components/room/addRoom/AddRoom";
import { options_post_list } from "../../utils/helpers";
import { validMemberships } from "../../utils/constants";

const Innkeeper = () => {
    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    const [showAddRoom, setShowAddRoom] = useState(false);

    const handleAddRoomClick = () => {
        if (validMemberships.includes(userData?.user?.membership)) {
            setShowAddRoom(true);
        } else {
            toast.error("Vui lòng lên hội viên để dùng chức năng này!");
        }
    };


    return (
        <InnkeeperLayout>
            {!showAddRoom
                ?
                <div className="bg-white rounded-lg shadow-md p-6 h-full">
                    <div className="container mx-auto">
                        <div className="mb-8">
                            <h1 className="text-xl font-bold text-blue-800">
                                ĐĂNG TRỌ MỚI CỦA QUÝ VỊ LÊN{" "}
                                <span className="text-blue-400">TROSMART.COM</span>
                            </h1>
                            <p className="text-black font-semibold">Chọn loại hình muốn đăng</p>
                        </div>
                        <div className="grid grid-cols-2 space-y-4 md:space-y-0 md:space-x-4">
                            {options_post_list.map((item, index) => (
                                <div
                                    className="border p-6 rounded-sm border-gray-200 text-center flex flex-col items-center justify-between"
                                    key={index}
                                >
                                    <div className="mb-4">{item.icon}</div>
                                    <h2 className="text-lg font-bold text-blue-900 mb-2">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-700 mb-4 font-semibold">{item.des}</p>
                                    <button
                                        className="cursor-pointer bg-blue-800 text-white px-4 py-2 rounded transform transition-all hover:bg-blue-400 hover:scale-105"
                                        onClick={handleAddRoomClick}
                                    >
                                        Đăng ngay
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <AddRoom />
            }


        </InnkeeperLayout>
    );
};

export default Innkeeper;
