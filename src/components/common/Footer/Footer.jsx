import React from "react";
import logo from "../../../assets/images/logo.png";
import logo_mat_bang from "../../../assets/images/logo_mat_bang.png";
import logo_nha_dat from "../../../assets/images/logo_nha_dat.png";
import logo_phong_kham from "../../../assets/images/logo_phong_kham.png";
import { FaPhoneAlt, FaEnvelope, FaTiktok, FaCommentDots, FaYoutube } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <img alt="SMART logo" className="mb-3" height="50"
            src={logo} width="200" />
          <p className="text-center md:text-left text-gray-700">
            Thành viên của {" "}
            <a className="text-blue-800" href="https://trosmart.vn">
              TROSMART.vn
            </a>
          </p>
          <div className="flex space-x-4 mt-2">
            <img alt="Phòng khám tốt logo" height="60" src={logo_phong_kham} width="60" />
            <img alt="Nhà đẹp đầy tốt logo" height="60" src={logo_nha_dat} width="60" />
            <img alt="Mặt bằng mới logo" height="60" src={logo_mat_bang} width="60" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
          <div>
            <h3 className="text-blue-800 font-bold mb-4">
              THÔNG TIN
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li className="hover:text-blue-600 cursor-pointer transition">Điều khoản &amp; Cam kết</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Quy chế hoạt động</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Giải quyết khiếu nại</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h3 className="text-blue-800 font-bold mb-4">
              HỆ THỐNG
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li className="hover:text-blue-600 cursor-pointer transition">Dành cho chủ trọ</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Bảng phí</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Hướng dẫn</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Hướng dẫn thanh toán VNPAY</li>
              <li className="hover:text-blue-600 cursor-pointer transition">Liên hệ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-blue-800 font-bold mb-4">
              KẾT NỐI VỚI CHÚNG TÔI
            </h3>
            <ul className="text-gray-700 space-y-3">
              {[
                { icon: <FaPhoneAlt />, text: "033.266.1579" },
                { icon: <FaEnvelope />, text: "info@ohi.vn" },
                { icon: <RiFacebookCircleFill />, text: "tromoitoanquoc - tromoihue" },
                { icon: <FaTiktok />, text: "trosm.com - @trosm.hcm" },
                { icon: <FaCommentDots />, text: "0332661579" },
                { icon: <FaYoutube />, text: "@trosmart" }
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    {item.icon}
                  </div>
                  <span className="hover:text-blue-600 cursor-pointer transition">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
