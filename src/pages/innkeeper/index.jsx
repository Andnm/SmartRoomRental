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
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextStep = (item) => {
    if (step === 1) {
      if (!validMemberships.includes(userData?.user?.membership) && item !== "looking_for_roommates") {
        toast.error("Vui lòng lên hội viên để dùng chức năng này!");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleSelectOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <InnkeeperLayout>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
                onClick={() => step > 1 && setStep(1)}
              >
                1
              </div>
              <span
                className={`ml-2 ${
                  step >= 1 ? "text-gray-700" : "text-gray-400"
                } cursor-pointer`}
                onClick={() => step > 1 && setStep(1)}
              >
                Chọn loại hình
              </span>
            </div>

            <div className="flex-grow border-t border-gray-300 mx-4"></div>

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
                } ${
                  !selectedOption && step === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  if (selectedOption) setStep(2);
                }}
              >
                2
              </div>
              <span
                className={`ml-2 ${
                  step >= 2 ? "text-gray-700" : "text-gray-400"
                } ${
                  !selectedOption && step === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  if (selectedOption) setStep(2);
                }}
              >
                Điền thông tin
              </span>
            </div>

            <div className="flex-grow border-t border-gray-300 mx-4"></div>

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                3
              </div>
              <span
                className={`ml-2 ${
                  step >= 3 ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Hoàn tất
              </span>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-10 ">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-blue-800">
                ĐĂNG TRỌ MỚI CỦA QUÝ VỊ LÊN{" "}
                <span className="text-blue-400">TROSMART.COM</span>
              </h1>
              <p className="text-black font-semibold">
                Chọn loại hình muốn đăng
              </p>
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
                  <p className="text-gray-700 font-semibold">{item.des}</p>
                  {item.note ? (
                    <i className="text-xs text-red-700">({item.note})</i>
                  ) : (
                    <></>
                  )}
                  <button
                    className="cursor-pointer  mt-4 bg-blue-800 text-white px-4 py-2 rounded transform transition-all hover:bg-blue-400 hover:scale-105"
                    onClick={() => {
                      handleSelectOption(item.value);
                      handleNextStep(item.value);
                    }}
                  >
                    Đăng ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <AddRoom onNext={() => setStep(3)} selectedOption={selectedOption} />
      )}

      {step === 3 && (
        <div className="text-center p-6 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-bold text-green-600">
            Đăng trọ thành công!
          </h2>
          <p className="text-gray-700 mt-2">
            Chúng tôi sẽ xem xét và duyệt tin của bạn sớm nhất.
          </p>
        </div>
      )}
    </InnkeeperLayout>
  );
};

export default Innkeeper;
