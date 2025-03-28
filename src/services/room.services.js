import axiosInstance from "./axiosInstance";

export const getAllRoomsByAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/rooms`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRoomsByGuest = async () => {
  try {
    const response = await axiosInstance.get(`/api/rooms/active`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRooms = async (dataBody) => {
  try {
    const response = await axiosInstance.post(`/api/rooms`, dataBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLookingForRoommates = async (dataBody) => {
  try {
    const response = await axiosInstance.post(`/api/payOs/create_post_room`, dataBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRooms = async (room_id) => {
  try {
    const response = await axiosInstance.post(`/api/rooms/${room_id}`);
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

export const approveRoomForAdmin = async (room_id, room_status) => {
  try {
    const response = await axiosInstance.put(
      `/api/rooms/admin/status/${room_id}/${room_status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectRoomForAdmin = async (
  room_id,
  room_status,
  reject_reason
) => {
  try {
    const response = await axiosInstance.put(
      `/api/rooms/admin/status/${room_id}/${room_status}`,
      reject_reason
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
