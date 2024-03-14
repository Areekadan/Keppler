import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Container,
  Row,
  Col,
  Image,
  Card,
  OverlayTrigger,
} from "react-bootstrap";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import { IoChevronDown } from "react-icons/io5";
import ProductToolTip from "../components/RatingToolTip";
import { getOneProduct } from "../features/products/productSlice";
import { priceWithCommas } from "../utils";

const SingleProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const formattedPrice = priceWithCommas(Number(product.price));

  useEffect(() => {
    if (slug) {
      dispatch(getOneProduct({ slug }));
    }
  }, [dispatch, slug]);

  if (isLoading || !product) {
    return <Spinner />;
  }
  console.log(product);
  return (
    <Container className="mg-top">
      <Row>
        <Col lg={6} className="mb-4 mt-2">
          <Card className="single-product-card">
            <Card.Img
              variant="top"
              src={product.cover_photo}
              alt={product.title}
            />
          </Card>
          <Row>
            {[
              product.photo1,
              product.photo2,
              product.photo3,
              product.photo4,
            ].map((photo, index) =>
              photo ? (
                <Col key={index} xs={6} md={6} lg={3}>
                  <Card className="additional-image-card">
                    <Card.Img
                      variant="top"
                      src={photo}
                      alt={`Product image ${index + 1}`}
                    />
                  </Card>
                </Col>
              ) : null
            )}
          </Row>
        </Col>
        <Col lg={6} className="mt-2">
          <h3>{product.title}</h3>
          <div className="d-flex justify-content-start align-items-center">
            <Badge bg="success" className="me-2">
              {product.country}
              {","} {product.city}
            </Badge>
            {product.advert_type !== "Other" && (
              <Badge bg="success" className="me-2">
                {product.advert_type}
              </Badge>
            )}
            {product.product_type !== "Other" && (
              <Badge bg="success" className="me-2">
                {product.product_type}
              </Badge>
            )}
            <Badge bg="success" className="me-2">
              {product.product_status}
            </Badge>
          </div>
          <div className="ratings-and-views-container">
            <div
              className="text-center d-flex align-items-start justify-content-center product-rating-and-reviews"
              ref={target}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <span className="me-1">{product.average_rating}</span>
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
                    ({product.review_count}{" "}
                    {product.review_count > 1 ? "ratings" : "rating"})
                    <IoChevronDown />
                  </div>
                </OverlayTrigger>
              </sub>
            </div>
          </div>
          <h3
            style={{
              fontWeight: "bold",
            }}
          >
            ${formattedPrice}
          </h3>
          <p>{product.description}</p>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="mt-4">
              <h4>Customer Reviews</h4>
              {product.reviews.map((review, index) => (
                <Card key={index} className="mb-3 p-2">
                  <Card.Body>
                    <StarRating rating={review.rating} />
                    <Card.Text>{review.comment}</Card.Text>
                    <footer className="blockquote-footer reviewer-name">
                      {"@" + review.reviewer}
                    </footer>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-4 border p-2 d-flex flex-column align-items-center justify-content-center">
              <h4>No reviews yet.</h4>
              <p style={{ color: "silver", fontSize: "medium" }}>
                Add one to start the conversation!
              </p>
              <button className="btn btn-primary">Add Review</button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProductPage;
