import React, { useState, useRef } from "react";
import { Badge, Button, Card, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import StarRating from "./StarRating";
import ProductToolTip from "./RatingToolTip";
import { priceWithCommas, truncateText } from "../utils";

const Product = ({ product }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const truncatedText = truncateText(product.title, 121);
  const formattedPrice = priceWithCommas(Number(product.price));
  return (
    <Card className="product-card">
      <Badge bg="success" className="product-badge">
        {product.country}
        {","} {product.city}
      </Badge>
      <Card.Img src={product.cover_photo} variant="top"></Card.Img>
      <Card.Body className="product-card-body">
        <Link
          className="text-dark text-decoration-none"
          to={`/products/${product.slug}`}
        >
          <Card.Title as="p" className="product-title">
            <strong>{truncatedText}</strong>
          </Card.Title>
          <Card.Title className="product-price">${formattedPrice}</Card.Title>
        </Link>
        <hr className="product-divider" />
        <div className="ratings-and-views-container">
          <div
            className="product-rating-and-reviews"
            ref={target}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <StarRating rating={product.average_rating} />
            <sub className="ms-1" style={{ color: "blue" }}>
              <OverlayTrigger
                placement="bottom"
                show={show}
                target={target.current}
                overlay={(props) => (
                  <ProductToolTip product={product} {...props} />
                )}
              >
                <div style={{ cursor: "pointer" }}>
                  ({product.review_count})
                  <IoChevronDown />
                </div>
              </OverlayTrigger>
            </sub>
          </div>
          <div className="product-view-count">
            <FaEye />
            <sub> ({product.views})</sub>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
