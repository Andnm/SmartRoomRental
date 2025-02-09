import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import PaymentOption from "./PaymentOption";
import { PaymentMethodEnum, PaymentMethodName, TransactionTypeEnum } from "../../utils/constants";

const ModalChoosePaymentMethod = (props) => {
  const {
    open,
    onClose,
    title,
    paymentPurpose,
    handlePaymentByInternetBanking,
    handlePaymentByWallet,
  } = props;

  const [paymentError, setPaymentError] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Tạo trạng thái cho modal confirm

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentError("");
  };

  const handleCheckPaymentClick = () => {
    if (!selectedPaymentMethod) {
      setPaymentError("Vui lòng chọn phương thức muốn thanh toán");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    setIsConfirmModalOpen(false);

    try {
      switch (selectedPaymentMethod) {
        case PaymentMethodEnum.INTERNET_BANKING:
          console.log("Internet Banking selected");
          await handlePaymentByInternetBanking();
          break;

        case PaymentMethodEnum.WALLET:
          if (paymentPurpose === TransactionTypeEnum.UpMembership) {
            console.log("Wallet selected for UpMembership");
            await handlePaymentByWallet();
          }
          break;

        default:
          console.log("Phương thức thanh toán không hợp lệ");
      }
    } catch (error) {
      console.error("Error create link payment:", error);
      message.error("Có lỗi khi tạo link thanh toán!");
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        width={"500px"}
        title={"Vui lòng chọn phương thức thanh toán"}
        open={open}
        onCancel={() => {
          onClose();
          setSelectedPaymentMethod(null);
        }}
        footer={[
          <Button
            className="btn-submit"
            key="cancel"
            type="text"
            onClick={() => {
              onClose();
            }}
          >
            Huỷ
          </Button>,
          <Button
            className="btn-submit btn-continue-with-new-info"
            key="submit"
            onClick={handleCheckPaymentClick}
          >
            Xác nhận
          </Button>,
        ]}
        maskClosable={false}
      >
        <div className="flex justify-center gap-5">
          <PaymentOption
            src="https://play-lh.googleusercontent.com/22cJzF0otG-EmmQgILMRTWFPnx0wTCSDY9aFaAmOhHs30oNHxi63KcGwUwmbR76Msko"
            alt="MoMo"
            paymentMethod={PaymentMethodEnum.INTERNET_BANKING}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePaymentSelection={handlePaymentSelection}
          />

          {paymentPurpose === TransactionTypeEnum.UpMembership && (
            <PaymentOption
              src="https://static.vecteezy.com/system/resources/previews/035/692/634/non_2x/wallet-icon-design-template-simple-and-clean-vector.jpg"
              alt="Wallet"
              paymentMethod={PaymentMethodEnum.WALLET}
              selectedPaymentMethod={selectedPaymentMethod}
              handlePaymentSelection={handlePaymentSelection}
            />
          )}
        </div>
        {paymentError && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {paymentError}
          </div>
        )}
      </Modal>

      <Modal
        centered={true}
        title="Xác nhận thanh toán"
        open={isConfirmModalOpen}
        onCancel={handleCancelConfirm}
        footer={[
          <Button key="cancel" onClick={handleCancelConfirm}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmPayment}>
            Xác nhận
          </Button>,
        ]}
      >
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-gray-400">Phương thức thanh toán đã chọn: <span className="text-black font-semibold">{PaymentMethodName[selectedPaymentMethod]}</span></p>
      </Modal>
    </>
  );
};

export default ModalChoosePaymentMethod;