import React, { useState } from 'react'
import InnkeeperLayout from '../../components/layout/InnkeeperLayout'
import { list_options_membership, TransactionTypeEnum } from '../../utils/constants'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/selector';
import SpinnerLoading from '../../components/loading/SpinnerLoading';
import { createUpMembershipByAccountBalance, createUpMembershipByPayOs } from '../../services/transaction.services';
import { useNavigate } from 'react-router-dom';
import { toastError } from '../../utils/helpers';
import { updateMembershipUser } from '../../redux/reducers/userReducer';
import ModalChoosePaymentMethod from '../../components/modal/ModalChoosePaymentMethod';

const Membership = () => {
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    null
  );
  const [isOpenModalChoosePaymentMethod, setIsOpenModalChoosePaymentMethod] = useState(false);

  const handleCheckLoginBeforePayProduct = (item) => {
    if (!userData?.user) {
      toast.error("Vui lòng đăng nhập!");
    } else {
      setSelectedItem(item);
      setIsOpenModalChoosePaymentMethod(true);
    }
  };

  const handleRedirectInternetBanking = async (item) => {
    const dataBody = {
      amount: item.price,
    };

    try {
      setIsLoading(true);

      const responseCreateLinkInternetBanking = await createUpMembershipByPayOs(item.membership,
        dataBody
      );

      console.log("responseCreateLinkInternetBanking: ", responseCreateLinkInternetBanking)

      const redirectUrl = responseCreateLinkInternetBanking.paymentUrl;

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán!");
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePaymentByWallet = async (item) => {
    const dataBody = {
      user_id: userData?.user?._id,
      membership: item?.membership,
      amount: item?.price,
    };

    setIsLoading(true);

    const checkWallet = item?.price <= userData?.user?.account_balance;

    if (!checkWallet) {
      toast.error("Tài khoản cá nhân không đủ, vui lòng nạp thêm!");
      setIsLoading(false);
      return;
    }

    try {
      const responseCreateByWallet = await createUpMembershipByAccountBalance(
        dataBody
      );

      dispatch(updateMembershipUser({ membership: item?.membership }));

      toast.success("Nâng cấp gói hội viên thành công!");
      navigate("/membership");
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán bằng tài khoản cá nhân!");
      toastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InnkeeperLayout>
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <h2 className='uppercase font-bold text-blue-800 text-lg text-center'>NÂNG CẤP TÀI KHOẢN ĐĂNG TIN KHÔNG GIỚI HẠN</h2>
        <div className="grid grid-cols-3 gap-5 mt-6">
          {list_options_membership.map((item, index) => (
            <div
              key={index}
              className="rounded-sm shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className='relative'>
                <img className="rounded-t-sm" src={item.img_link} loading="lazy" alt={item.name} />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase rounded-full px-4 py-2 bg-black text-gray-300 font-bold text-center whitespace-nowrap">
                  {item.name}
                </div>
              </div>
              <div className="py-2 px-4 mt-2">
                <div className="flex flex-row py-2 px-3 justify-between items-center bg-gray-100">
                  <p className="font-thin text-gray-400">Chi phí: </p>
                  <p className="font-semibold text-black">{item.price.toLocaleString()}đ</p>
                </div>

                <div className="flex flex-row py-2 px-3 justify-between items-center">
                  <p className="font-thin text-gray-400">Nâng tin</p>
                  <p className="font-semibold text-black">{item.raise_news}</p>
                </div>

                <div className="flex flex-row py-2 px-3 justify-between items-center bg-gray-100">
                  <p className="font-thin text-gray-400">Làm mới tin</p>
                  <p className="font-semibold text-black">{item.refresh_news}</p>
                </div>

                <div className="flex flex-row py-2 px-3 justify-between items-center">
                  <p className="font-thin text-gray-400">Thời hạn</p>
                  <p className="font-semibold text-black">{item.duration}</p>
                </div>

                <div
                  className="mt-4 mb-2 bg-orange-500 py-3 text-center text-white cursor-pointer rounded-sm transition-all duration-300 hover:bg-orange-600 hover:scale-105"
                  onClick={() => handleCheckLoginBeforePayProduct(item)}
                >
                  Đăng ký
                </div>
              </div>

            </div>
          ))}
        </div>

        {isOpenModalChoosePaymentMethod && (
          <ModalChoosePaymentMethod
            open={isOpenModalChoosePaymentMethod}
            onClose={() =>
              setIsOpenModalChoosePaymentMethod(false)
            }
            paymentPurpose={TransactionTypeEnum.UpMembership}
            title={`Bạn có chắc muốn mua "${selectedItem?.name}" để nâng cấp hội viên?`}
            handlePaymentByInternetBanking={() =>
              handleRedirectInternetBanking(selectedItem)
            }
            handlePaymentByWallet={() =>
              handlePaymentByWallet(selectedItem)
            }
          />
        )}
        {isLoading && <SpinnerLoading />}
      </div>
    </InnkeeperLayout>
  )
}

export default Membership