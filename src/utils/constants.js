import dorn_1 from "../assets/images/dorn_1.png";
import dorn_2 from "../assets/images/dorn_2.png";
import dorn_3 from "../assets/images/dorn_3.png";
import dorn_4 from "../assets/images/dorn_4.png";
import dorn_5 from "../assets/images/dorn_5.png";
import hochiminh from "../assets/images/hochiminh.png";
import hanoi from "../assets/images/hanoi.png";
import danang from "../assets/images/danang.png";
import thuathienhue from "../assets/images/thuathienhue.png";
import cantho from "../assets/images/cantho.png";
import khanhhoa from "../assets/images/khanhhoa.png";
import connect_network from "../assets/images/connect_network.png";
import raiseup from "../assets/images/raiseup.png";
import advertisement from "../assets/images/advertisement.png";
import news_1 from "../assets/images/news_1.png";
import news_2 from "../assets/images/news_2.png";
import news_3 from "../assets/images/news_3.png";
import news_4 from "../assets/images/news_4.png";
import diamond_membership_bg from "../assets/images/diamon_membership_bg.png";
import gold_membership_bg from "../assets/images/gold_membership_bg.png";
import silver_membership_bg from "../assets/images/silver_membership_bg.png";

export const TransactionTypeEnum = {
  AddFunds: "AddFunds",
  UpMembership: "UpMembership",
};

export const PaymentMethodEnum = {
  INTERNET_BANKING: "internetBanking",
  WALLET: "wallet",
};

export const PaymentMethodName = {
  [PaymentMethodEnum.INTERNET_BANKING]: "Internet Banking",
  [PaymentMethodEnum.WALLET]: "Tài khoản cá nhân",
};

export const validMemberships = ["Silver", "Gold", "Diamond"];

export const list_options_membership = [
  {
    img_link: silver_membership_bg,
    membership: "Silver",
    name: "Gói bạc",
    price: 500000,
    raise_news: "15 HOT",
    refresh_news: "10 lần",
    duration: "30 ngày",
  },
  {
    img_link: gold_membership_bg,
    membership: "Gold",
    name: "Gói vàng",
    price: 800000,
    raise_news: "10 VIP",
    refresh_news: "15 lần",
    duration: "30 ngày",
  },
  {
    img_link: diamond_membership_bg,
    membership: "Diamond",
    name: "Gói kim cương",
    price: 1000000,
    raise_news: "30 VIP - HOT",
    refresh_news: "30 lần",
    duration: "30 ngày",
  },
];

export const menuItemsHeader = [
  { name: "Phòng trọ", to: "/boarding" },
  { name: "Nhà nguyên căn, chung cư", to: "/apartment-fullhouse" },
  { name: "Tìm bạn ở ghép", to: "/looking-for-roommates" },
  { name: "Blog", to: "/blogs" },
];

export const hot_news = [
  {
    title:
      "Khám phá hệ thống đăng tin và quản lý trọ hiệu quả dành cho chủ trọ",
    img_link: news_1,
  },
  {
    title: "Thực hư về hệ thống tìm trọ toàn quốc HOT NHẤT hiện nay!",
    img_link: news_2,
  },
  { title: "Giao diện nâng cấp - Trải nghiệm nâng tầm", img_link: news_3 },
  {
    title: "Thủ tục đăng ký tạm trú tạm vắng cho người ở trọ mới nhất 2024",
    img_link: news_4,
  },
];

export const quantity_provinces_dorn = [
  { province: "Hồ Chí Minh", quantity: 8422 },
  { province: "Hà Nội", quantity: 1756 },
  { province: "Thừa Thiên Huế", quantity: 967 },
  { province: "Đà Nẵng", quantity: 875 },
  { province: "Cần Thơ", quantity: 137 },
  { province: "Bình Dương", quantity: 92 },
  { province: "Long An", quantity: 25 },
  { province: "Đồng Nai", quantity: 18 },
  { province: "Bà Rịa - Vũng Tàu", quantity: 12 },
  { province: "Khánh Hòa", quantity: 9 },
  { province: "Quảng Nam", quantity: 8 },
  { province: "Bắc Ninh", quantity: 7 },
  { province: "Tiền Giang", quantity: 5 },
  { province: "Hải Phòng", quantity: 5 },
  { province: "Hải Dương", quantity: 3 },
  { province: "Tây Ninh", quantity: 3 },
  { province: "Kon Tum", quantity: 3 },
  { province: "Kiên Giang", quantity: 3 },
  { province: "Thái Nguyên", quantity: 3 },
  { province: "Lâm Đồng", quantity: 3 },
];

export const introduction = [
  { title: "Mạng lưới nhà trọ cho thuê mới nhất", img_link: connect_network },
  {
    title: "Gia tăng 5.000 người thuê mới thực sự mới mỗi tháng",
    img_link: raiseup,
  },
  {
    title: "Quảng cáo nhà của bạn với chúng tôi và cảm nhận ngay hiệu quả",
    img_link: advertisement,
  },
];

export const provinces_outstanding = [
  { name: "Hồ Chí Minh", img_link: hochiminh },
  { name: "Hà Nội", img_link: hanoi },
  { name: "Đà Nẵng", img_link: danang },
  { name: "Thừa Thiên Huế", img_link: thuathienhue },
  { name: "Cần Thơ", img_link: cantho },
  { name: "Khánh Hòa", img_link: khanhhoa },
];

export const rooms_sample = [
  {
    id: 1,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    type: "post_room",
    price: 6500000,
    category: "Self-managed boarding house",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 2,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Managed boarding house",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 3,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Dormitory",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 4,
    title: "Cần tìm nữ ở ghép phòng cực đẹp tại 143 Hoàng Hoa Thám, Phường 13",
    type: "looking_for_roommates",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address: "143 Hoàng Hoa Thám, Phường 13, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 5,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 6,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 7,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 8,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 9,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 10,
    title:
      "Ký túc xá số 234 Nguyễn Tri Phương, Phường 4, Quận 10, Thành phố Hồ Chí Minh",
    type: "looking_for_roommates",
    price: 6500000,
    category: "Dormitory",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address: "234 Nguyễn Tri Phương, Phường 4, Quận 10, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
  {
    id: 11,
    title:
      "Studio full nội thất số 12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình",
    type: "post_room",
    price: 6500000,
    category: "Apartment",
    area: 75,
    description: "A modern, fully furnished apartment with a great view.",
    objects: ["Đi học", "Đi làm", "Gia đình", "Cặp đôi"],
    environments: ["Chợ", "Siêu thị", "Bệnh viện", "Công viên"],
    utilities: [
      "Wifi",
      "Vệ sinh trong",
      "Phòng tắm",
      "Kệ bếp",
      "Máy giặt",
      "Điều hòa",
      "Tủ lạnh",
      "Giường nệm",
      "Tủ áo quần",
      "Bãi để xe riêng",
      "Camera an ninh",
    ],
    address:
      "12/4/6C Nguyễn Cảnh Dị, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh",
    img_links: [
      "https://cdn.chotot.com/PUbgZCS9vR2QsfjRDU_jy7EU7vhaPbLVcoNz8LcfMhI/preset:view/plain/76a8abab8f241783ce7a2d2d45e72a80-2895418999997961399.jpg",
      "https://cdn.chotot.com/J5qKEKm2lfZRTJ_d7o1JqGq6sP6WBCcriP4hCuSQKGI/preset:view/plain/f8c1ed87576f918ef85fade886201477-2895419000374215478.jpg",
      "https://cdn.chotot.com/Y2xfQvM-kzw9IqRJetTqFy_BuDajczCjVADcgDlbGKI/preset:view/plain/8316b09c0c31bad4cb379fd669f76ca3-2895419000105801666.jpg",
      "https://cdn.chotot.com/GwXs0opgpJUWmAaBQ-USxC-cxN0UPeEGdt4LUzqWpaE/preset:view/plain/79b548d8f6ee741f4bf2b3fd94309fb7-2895418999376976473.jpg",
      "https://cdn.chotot.com/CqRP4UuYFald0ORbsOGgmulCFdKKZxmP-B-jy2lUeTM/preset:view/plain/aa4c6449a8e68e03825b0e915e2cedb4-2895419000075073736.jpg",
      "https://cdn.chotot.com/Sk5BdPSWHrmQlaOgdggZiSCMUTtsH1srCLz3VznpOf4/preset:view/plain/55bb6500953ecf38a0595b8b42127d55-2895419000270138023.jpg",
      "https://cdn.chotot.com/FCaMnUyt2-cVLurqb_ZeheJPnJXoX_67M1s4pUF2OeA/preset:view/plain/8aee5ec87257867c893ea4a84f6c5d3a-2895418999967896810.jpg",
    ],
    status: "active",
    contact_fullname: "Hải Anh",
    contact_phone: "0915567797",
    contact_email: "haianh@gmail.com",
    contact_address: "123 Main St, City Center",
  },
];

export const rooms_carousel = [
  {
    id: 1,
    title:
      "Nhà trọ số 166 đường Cao Thắng, Phường 11, Quận 10, Thành Phố Hồ Chí Minh",
    type: "post_room",
    price: 3000000,
    category: "Self-managed boarding house",
    area: 75,
    address: "166 đường Cao Thắng, Phường 11, Quận 10, Thành Phố Hồ Chí Minh",
    img_links: [dorn_1],
    status: "active",
  },
  {
    id: 2,
    title:
      "Nhà trọ số 329 Phạm Văn Chí, Phường 3, Quận 6, Thành Phố Hồ Chí Minh",
    type: "post_room",
    price: 5100000,
    category: "Self-managed boarding house",
    area: 75,
    address: "329 Phạm Văn Chí, Phường 3, Quận 6, Thành Phố Hồ Chí Minh",
    img_links: [dorn_2],
    status: "active",
  },
  {
    id: 3,
    title:
      "Căn hộ số 373/10 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Thành Phố Hồ Chí Minh",
    type: "post_room",
    price: 11000000,
    category: "Self-managed boarding house",
    area: 75,
    address: "373/10 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Thành Phố Hồ Chí Minh",
    img_links: [dorn_3],
    status: "active",
  },
  {
    id: 4,
    title:
      "Nhà trọ số 94 Phó Cơ Điều, Phường 4, Quận 11, Thành Phố Hồ Chí Minh",
    type: "post_room",
    price: 4700000,
    category: "Self-managed boarding house",
    area: 75,
    address: "94 Phó Cơ Điều, Phường 4, Quận 11, Thành Phố Hồ Chí Minh",
    img_links: [dorn_4],
    status: "active",
  },
  {
    id: 4,
    title:
      "Ký túc nữ 382/10 Điện Biên Phủ, Phường 11, Quận 10, Thành Phố Hồ Chí Minh",
    type: "post_room",
    price: 1800000,
    category: "Self-managed boarding house",
    area: 75,
    address: "382/10 Điện Biên Phủ, Phường 11, Quận 10, Thành Phố Hồ Chí Minh",
    img_links: [dorn_5],
    status: "active",
  },
];

export const housingCategoryTranslation = {
  "Self-managed boarding house": "Nhà trọ tự quản",
  "Managed boarding house": "Nhà trọ có quản lý",
  Dormitory: "Ký túc xá",
  Apartment: "Căn hộ",
  Homestay: "Homestay",
  "Full-house": "Nhà nguyên căn",
};

export const boardingCategories = [
  "Self-managed boarding house",
  "Managed boarding house",
  "Dormitory",
];

export const apartmentFullHouseCategories = [
  "Apartment",
  "Homestay",
  "Full-house",
];
