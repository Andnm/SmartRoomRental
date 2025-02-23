import {
  boardingCategories,
  housingCategoryTranslation,
  housingTypeTranslation,
} from "./constants";

export const formatPrice = (price) => {
  const numberString = String(price);
  const numberArray = numberString.split("");
  const dotPosition = numberArray.length % 3 || 3;
  for (let i = dotPosition; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, ".");
  }
  const formattedNumber = numberArray.join("");
  return formattedNumber;
};

export const formatDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  if (isNaN(date)) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatTime = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  if (isNaN(date)) return "Invalid time";

  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  return `${minutes}-${hours}`;
};

export const areInArray = (arr, ...elements) => {
  for (let element of elements) {
    if (arr?.includes(element)) {
      return true;
    }
  }
  return false;
};

export const translateHousingCategory = (type) => {
  return housingCategoryTranslation[type] || "Không xác định";
};

export const translateHousingType = (type) => {
  return housingTypeTranslation[type] || "Không xác định";
};

export const getCategoryLabel = (category) => {
  return boardingCategories.includes(category)
    ? "Phòng trọ"
    : "Nhà nguyên căn, chung cư";
};

export const getRandomRating = () =>
  (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

export const translateRank = (rank) => {
  const rankMap = {
    Normal: "Bình thường",
    Silver: "Bạc",
    Gold: "Vàng",
    Diamond: "Kim cương",
  };

  return rankMap[rank] || rank;
};

export const convertMembership = (actionType) => {
  const actionMap = {
    up_membership: "Nâng cấp hội viên",
    add_funds: "Nạp tiền tài khoản",
    post_room: "Đăng phòng",
    looking_for_roommates: "Đăng tìm bạn ở chung"
  };

  return actionMap[actionType] || actionType;
};

export const generateOptions = (translationObject) =>
  Object.entries(translationObject).map(([value, label]) => ({ label, value }));
