import { boardingCategories, housingCategoryTranslation } from "./constants";

// Format price to include currency and commas (e.g., 1,000.00)
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

// Format date to "dd-mm-yyyy"
export const formatDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  if (isNaN(date)) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

// Format time to "mm-hh"
export const formatTime = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  if (isNaN(date)) return "Invalid time";

  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");

  return `${minutes}-${hours}`;
};


export const translateHousingType = (type) => {
  return housingCategoryTranslation[type] || "Không xác định";
};

export const getCategoryLabel = (category) => {
  return boardingCategories.includes(category) ? "Phòng trọ" : "Nhà nguyên căn, chung cư";
};