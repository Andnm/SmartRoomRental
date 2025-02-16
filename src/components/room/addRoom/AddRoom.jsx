import React, { useState } from "react";
import {
  environmentLabels,
  objectLabels,
  toastError,
  utilityLabels,
} from "../../../utils/helpers";
import { housingCategoryTranslation } from "../../../utils/constants";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SpinnerLoading from "../../loading/SpinnerLoading";
import { toast } from "react-toastify";
import { postRooms } from "../../../services/room.services";

const AddRoom = ({ onNext, selectedOption }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    title: "",
    type: selectedOption,
    price: "",
    category: "",
    area: "",
    description: "",
    objects: [],
    environments: [],
    utilities: [],
    address: "",
    img_links: [],
    status: "under_review",
    contact_fullname: "",
    contact_phone: "",
    contact_email: "",
    contact_address: "",
    reason_rejected: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    Object.keys(roomDetails).forEach((key) => {
      if (
        key !== "reason_rejected" &&
        (!roomDetails[key] ||
          (Array.isArray(roomDetails[key]) && roomDetails[key].length === 0))
      ) {
        newErrors[key] = "Trường này không được để trống";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

      const cloud_name = process.env.REACT_APP_CLOUD_NAME;

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);

      try {
        const uploadedImageUrls = [];
        for (const fileItem of roomDetails.img_links) {
          try {
            const url = await uploadImageToCloudinary(fileItem.originFileObj);
            uploadedImageUrls.push(url);
          } catch (error) {
            toast.error("Lỗi khi tải lên ảnh: " + error.message);
            setIsLoading(false);
            return;
          }
        }

        const updatedRoomDetails = {
          ...roomDetails,
          img_links: uploadedImageUrls,
        };

        console.log("roomDetails after up cloud: ", updatedRoomDetails);

        const responseCreate = await postRooms(updatedRoomDetails);
        console.log("responseCreate: ", responseCreate);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        onNext();
      } catch (error) {
        toastError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Vui lòng kiểm tra lại các trường nhập!");
    }
  };

  const handleInputChange = (key, value) => {
    setRoomDetails((prev) => {
      const updatedDetails = { ...prev, [key]: value };
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: value ? "" : prevErrors[key],
      }));
      return updatedDetails;
    });
  };

  const handleCheckboxChange = (key, label) => {
    setRoomDetails((prev) => {
      const updatedList = prev[key].includes(label)
        ? prev[key].filter((item) => item !== label)
        : [...prev[key], label];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: updatedList.length ? "" : prevErrors[key],
      }));
      return { ...prev, [key]: updatedList };
    });
  };

  const handleFileChange = ({ fileList }) => {
    setRoomDetails((prev) => ({
      ...prev,
      img_links: fileList,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      img_links:
        fileList.length > 0 ? "" : "Vui lòng tải lên ít nhất một hình ảnh",
    }));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
        <h2 className="text-xl font-bold mb-4">THÔNG TIN CHUNG</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Tiêu đề
            </label>
            <input
              className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Ví dụ: phòng trọ 79 Lê Lợi, Quận 1"
              value={roomDetails.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Giá cho thuê
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="text"
                  value={roomDetails.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
                <span className="ml-2 self-center">đ</span>
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="area"
              >
                Diện tích
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="area"
                  type="text"
                  value={roomDetails.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                />
                <span className="ml-2 self-center">
                  m<sup>2</sup>
                </span>
              </div>
              {errors.area && (
                <p className="text-red-500 text-xs mt-1">{errors.area}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rental-category"
            >
              Kiểu loại
            </label>
            <select
              className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rental-category"
              value={roomDetails.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="" disabled>
                Chọn kiểu loại
              </option>
              {Object.entries(housingCategoryTranslation).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Nội dung mô tả
            </label>
            <textarea
              className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows="5"
              placeholder="Vui lòng nhập ít nhất 10 ký tự"
              value={roomDetails.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <h2 className="text-xl font-bold mb-4">ĐỐI TƯỢNG</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {objectLabels.map((label, index) => (
              <div key={index}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={roomDetails.objects.includes(label)}
                    onChange={() => handleCheckboxChange("objects", label)}
                  />
                  <span className="ml-2">{label}</span>
                </label>
              </div>
            ))}
          </div>
          {errors.objects && (
            <p className="text-red-500 text-xs mb-4">{errors.objects}</p>
          )}

          <h2 className="text-xl font-bold mb-4 mt-4">MÔI TRƯỜNG XUNG QUANH</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {environmentLabels.map((label, index) => (
              <div key={index}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={roomDetails.environments.includes(label)}
                    onChange={() => handleCheckboxChange("environments", label)}
                  />
                  <span className="ml-2">{label}</span>
                </label>
              </div>
            ))}
          </div>
          {errors.environments && (
            <p className="text-red-500 text-xs mb-4">{errors.environments}</p>
          )}

          <h2 className="text-xl font-bold mb-4 mt-4">TIỆN ÍCH</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {utilityLabels.map((label, index) => (
              <div key={index}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={roomDetails.utilities.includes(label)}
                    onChange={() => handleCheckboxChange("utilities", label)}
                  />
                  <span className="ml-2">{label}</span>
                </label>
              </div>
            ))}
          </div>
          {errors.utilities && (
            <p className="text-red-500 text-xs mb-4">{errors.utilities}</p>
          )}

          <h2 className="text-xl font-bold mb-4 mt-4">ĐỊA ĐIỂM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                Tỉnh/TP
              </label>
              <select
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
              >
                <option>Chọn Tỉnh/TP</option>
              </select>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="district"
              >
                Quận/Huyện
              </label>
              <select
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="district"
              >
                <option>Quận/Huyện</option>
              </select>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ward"
              >
                Phường/Xã
              </label>
              <select
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ward"
              >
                <option>Phường/Xã</option>
              </select>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="street"
              >
                Đường
              </label>
              <select
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street"
              >
                <option>Đường</option>
              </select>
            </div> */}

            <div className="col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                value={roomDetails.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hình ảnh tổng quan
            </label>
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              {roomDetails.img_links.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
            {errors.img_links && (
              <p className="text-red-500 text-xs mt-1">{errors.img_links}</p>
            )}
          </div>

          <h2 className="text-xl font-bold mb-4">THÔNG TIN LIÊN HỆ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Họ Tên
              </label>
              <input
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={roomDetails.contact_fullname}
                onChange={(e) =>
                  handleInputChange("contact_fullname", e.target.value)
                }
              />
              {errors.contact_fullname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_fullname}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <input
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="0123456789"
                value={roomDetails.contact_phone}
                onChange={(e) =>
                  handleInputChange("contact_phone", e.target.value)
                }
              />
              {errors.contact_phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_phone}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="nguyenvanA@gmail.com"
                value={roomDetails.contact_email}
                onChange={(e) =>
                  handleInputChange("contact_email", e.target.value)
                }
              />
              {errors.contact_email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_email}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address-contact"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border border-gray-300  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address-contact"
                type="text"
                placeholder="Địa chỉ của bạn"
                value={roomDetails.contact_address}
                onChange={(e) =>
                  handleInputChange("contact_address", e.target.value)
                }
              />
              {errors.contact_address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact_address}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              Đăng trọ
            </button>
          </div>
        </form>
      </div>

      {isLoading && <SpinnerLoading />}
    </>
  );
};

export default AddRoom;
