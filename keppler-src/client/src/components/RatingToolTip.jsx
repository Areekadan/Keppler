import React, { forwardRef } from "react";
import { Tooltip } from "react-bootstrap";

const RatingToolTip = forwardRef(({ product, ...props }, ref) => {
  const calculateRatingsDistribution = (reviews) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (review.rating in distribution) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };
  const ratingsDistribution = calculateRatingsDistribution(product.reviews);
  return (
    <Tooltip ref={ref} {...props}>
      <div
        style={{
          fontSize: "large",
          fontWeight: "bolder",
          marginBottom: "5px",
          textAlign: "center",
        }}
      >
        Average Rating: {product.average_rating} out of 5
      </div>
      {Object.entries(ratingsDistribution).map(([star, count]) => {
        const widthPercentage =
          product.review_count > 0 ? (count / product.review_count) * 100 : 0;

        return (
          <div key={star} style={{ alignItems: "center" }}>
            <span>{`${star} star`}</span>
            <div
              className="review-bar-container"
              style={{ marginRight: "10px" }}
            >
              {widthPercentage === 0 ? (
                <div className="review-bar-blank"></div>
              ) : (
                <div
                  className="review-bar"
                  style={{ width: `${widthPercentage}%` }}
                >
                  <span className="review-percentage">{`${parseFloat(
                    widthPercentage.toFixed(0)
                  )}%`}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </Tooltip>
  );
});

export default RatingToolTip;
