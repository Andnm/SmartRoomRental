import React from 'react'

const AddFunds = () => {
    return (
        <body class="bg-gray-100">
            <div class="max-w-3xl mx-auto p-6 bg-white shadow-md mt-10">
                <h1 class="text-xl font-bold mb-4">
                    NẠP TIỀN
                </h1>
                <hr class="mb-4" />
                <div class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">
                        Chọn nhanh số tiền nạp
                    </h2>
                    <div class="grid grid-cols-3 gap-4">
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                50.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                100.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                200.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                300.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                500.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                1.000.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                1.500.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                2.000.000 VND
                            </span>
                        </label>
                        <label class="flex items-center">
                            <input class="mr-2" name="amount" type="radio" />
                            <span>
                                Số khác
                            </span>
                        </label>
                    </div>
                </div>
                <div class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">
                        Chọn phương thức thanh toán:
                    </h2>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="border p-4 text-center">
                            <img alt="VNPay QR logo" class="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/LY6fBpxKobp2JVuMm24hHr-8aBYbchcHJLzf1ujR86E.jpg" width="100" />
                            <p class="font-bold">
                                VN PAY QR
                            </p>
                            <p>
                                Scan to Pay
                            </p>
                        </div>
                        <div class="border p-4 text-center">
                            <img alt="ATM/Internet Banking logo" class="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/RbiemDQQhScd3zBc2mONGUbCP6d2TOA2_m6-W85yyP0.jpg" width="100" />
                            <p class="font-bold">
                                ATM/INTERNET BANKING
                            </p>
                        </div>
                        <div class="border p-4 text-center">
                            <img alt="QR Code Scan logo" class="mx-auto mb-2" height="100" src="https://storage.googleapis.com/a1aa/image/OPAP_51eqmGjVxOBECM_rAuztguJVrcN9PqUrduj_ZM.jpg" width="100" />
                            <p class="font-bold">
                                Quét mã QR Code
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mb-6">
                    <h2 class="text-lg font-semibold mb-2">
                        CHI TIẾT GIAO DỊCH
                    </h2>
                    <div class="mb-2">
                        <p class="font-semibold">
                            Số tiền thanh toán:
                        </p>
                        <p>
                            0
                        </p>
                    </div>
                    <div class="mb-2">
                        <p class="font-semibold">
                            Phương thức thanh toán:
                        </p>
                        <p>
                            ...
                        </p>
                    </div>
                    <div class="mb-2">
                        <p class="font-semibold">
                            Nạp vào tài khoản
                        </p>
                        <p>
                            DK
                        </p>
                    </div>
                </div>
                <div class="text-center">
                    <button class="bg-blue-600 text-white px-6 py-2 rounded">
                        Nạp tiền
                    </button>
                </div>
            </div>
        </body>
    )
}

export default AddFunds