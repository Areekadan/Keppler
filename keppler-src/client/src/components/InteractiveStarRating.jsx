import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const InteractiveStarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null); // State to track hover index

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <button
            type="button"
            key={ratingValue}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaStar
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size="20px"
            />
          </button>
        );
      })}
    </div>
  );
};

export default InteractiveStarRating;
