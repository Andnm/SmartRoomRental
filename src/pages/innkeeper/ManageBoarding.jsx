import React, { useEffect, useState } from "react";
import InnkeeperLayout from "../../components/layout/InnkeeperLayout";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import RoomCard from "../../components/room/roomCard/RoomCard";
import { getAllRoomsByUser } from "../../services/room.services";
import { Spin } from "antd";

const ManageBoarding = () => {
  const userData = useSelector(userSelector);

  const [listRoom, setListRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!userData?.user?._id) return;
      setIsLoading(true);
      try {
        const rooms = await getAllRoomsByUser(userData?.user?._id);

        const sortedData = [...rooms].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setListRoom(sortedData);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <InnkeeperLayout>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spin size="large" />
          </div>
        ) : listRoom.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-medium">
            Bạn chưa đăng phòng trọ nào cả
          </div>
        ) : (
          <div className="flex flex-wrap gap-20 justify-center">
            {listRoom.map((room, index) => (
              <RoomCard
                key={index}
                room={room}
                is_hot={false}
                can_navigate={false}
                show_status={true}
              />
            ))}
          </div>
        )}
      </div>
    </InnkeeperLayout>
  );
};

export default ManageBoarding;
