import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/selector';
import { Modal } from 'antd';
import { createAddFundsByPayOs } from '../../services/transaction.services';
import { toastError } from '../../utils/helpers';
import { toast } from 'react-toastify';

const AddFunds = () => {
    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    const [customAmount, setCustomAmount] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(50000);
    const [paymentMethod, setPaymentMethod] = useState('ATM/INTERNET BANKING');

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        if (amount !== 0) {
            setCustomAmount(0);
        }
    };

    const handleCustomAmountChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setCustomAmount(value);
        setSelectedAmount(0);
    };


    const handleAddFunds = () => {
        if (selectedAmount === 0 && customAmount === 0) {
            toast.error("Vui lòng chọn số tiền thanh toán")
        } else {
            Modal.confirm({
                title: 'Xác nhận nạp tiền',
                content: (
                    <div>
                        <p>
                            <strong>Số tiền thanh toán:</strong> {
                                (selectedAmount === 0 ? customAmount : selectedAmount).toLocaleString()
                            } VND
                        </p>                        <p><strong>Phương thức thanh toán:</strong> {paymentMethod}</p>
                        <p><strong>Nạp vào tài khoản:</strong> {userData?.user?.fullname || 'Chưa xác định'}</p>
                    </div>
                ),
                okText: "Confirm",
                onOk: async () => {
                    try {
                        const amountToCharge = selectedAmount === 0 ? customAmount : selectedAmount;

                        if (amountToCharge <= 0) {
                            toast.error('Vui lòng nhập số tiền hợp lệ');
                            return;
                        }

                        const result = await createAddFundsByPayOs({ amount: selectedAmount });
                        if (result && result.paymentUrl) {
                            window.location.href = result.paymentUrl;
                        }
                    } catch (error) {
                        toastError(error)
                    }
                },
            });
        }
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    }

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md">
                <h1 className="text-xl font-bold mb-4">
                    NẠP TIỀN
                </h1>
                <hr className="mb-4" />
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Chọn nhanh số tiền nạp
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(50000)}
                                checked={selectedAmount === 50000}
                            />
                            <span>
                                50.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(100000)}
                                checked={selectedAmount === 100000}
                            />
                            <span>
                                100.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(200000)}
                                checked={selectedAmount === 200000}
                            />
                            <span>
                                200.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(300000)}
                                checked={selectedAmount === 300000}
                            />
                            <span>
                                300.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(500000)}
                                checked={selectedAmount === 500000}
                            />
                            <span>
                                500.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(1000000)}
                                checked={selectedAmount === 1000000}
                            />
                            <span>
                                1.000.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(1500000)}
                                checked={selectedAmount === 1500000}
                            />
                            <span>
                                1.500.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(2000000)}
                                checked={selectedAmount === 2000000}
                            />
                            <span>
                                2.000.000 VND
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mr-2"
                                name="amount"
                                type="radio"
                                onChange={() => handleAmountSelect(0)}
                                checked={selectedAmount === 0}
                            />
                            <span>
                                Số khác
                            </span>
                        </label>
                    </div>
                    {selectedAmount === 0 && (
                        <input
                            className="border p-2 w-full mt-4"
                            type="number"
                            value={customAmount || ""}
                            onChange={handleCustomAmountChange}
                            placeholder="Nhập số tiền"
                        />
                    )}
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Chọn phương thức thanh toán:
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border p-4 text-center opacity-50 cursor-not-allowed">
                            <img alt="VNPay QR logo" className="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/LY6fBpxKobp2JVuMm24hHr-8aBYbchcHJLzf1ujR86E.jpg" width="100" />
                            <p className="font-bold">
                                VN PAY QR
                            </p>
                            <p>
                                Scan to Pay
                            </p>
                        </div>
                        <div
                            className="border p-4 text-center cursor-pointer ring-2 ring-blue-500"
                            onClick={() => setPaymentMethod('ATM/INTERNET BANKING')}
                        >
                            <img alt="ATM/Internet Banking logo" className="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/RbiemDQQhScd3zBc2mONGUbCP6d2TOA2_m6-W85yyP0.jpg" width="100" />
                            <p className="font-bold">
                                ATM/INTERNET BANKING
                            </p>
                        </div>
                        <div className="border p-4 text-center opacity-50 cursor-not-allowed">
                            <img alt="QR Code Scan logo" className="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/OPAP_51eqmGjVxOBECM_rAuztguJVrcN9PqUrduj_ZM.jpg" width="100" />
                            <p className="font-bold">
                                Quét mã QR Code
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">
                        CHI TIẾT GIAO DỊCH
                    </h2>
                    <div className="mb-2">
                        <p className="font-semibold">
                            Số tiền thanh toán:
                        </p>
                        <p>
                            {formatCurrency(selectedAmount || customAmount)} VND
                        </p>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold">
                            Phương thức thanh toán:
                        </p>
                        <p>
                            {paymentMethod}
                        </p>
                    </div>
                    <div className="mb-2">
                        <p className="font-semibold">
                            Nạp vào tài khoản
                        </p>
                        <p>
                            {userData?.user?.fullname || 'Chưa xác định'}
                        </p>
                    </div>
                </div>
                <div className="text-center">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
                        onClick={handleAddFunds}
                    >
                        Nạp tiền
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddFunds