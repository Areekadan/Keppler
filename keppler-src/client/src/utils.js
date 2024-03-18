export const priceWithCommas = (x) => {
  const formattedPrice = x.toFixed(2);
  return formattedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, text.lastIndexOf(" ", maxLength)) + "...";
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
