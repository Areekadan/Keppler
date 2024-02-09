import React from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

const StarRating = ({ rating }) => {
  const numericRating = parseFloat(rating);
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= numericRating) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    } else if (
      i === Math.ceil(numericRating) &&
      !Number.isInteger(numericRating)
    ) {
      stars.push(<FaRegStarHalfStroke key={i} color="#ffc107" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ffc107" />);
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;
