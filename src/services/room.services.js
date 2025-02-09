import axiosInstance from "./axiosInstance";

export const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get(`/api/rooms`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRoomsByUser = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/api/rooms/user/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoomStatusForAdmin = async (room_id, room_status) => {
  try {
    const response = await axiosInstance.put(
      `/api/rooms/admin/status/${room_id}/${room_status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoomStatusForUser = async (room_id, room_status) => {
    try {
      const response = await axiosInstance.put(
        `/api/rooms/status/${room_id}/${room_status}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
