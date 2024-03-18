import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import { IoChevronDown } from "react-icons/io5";
import ProductToolTip from "../components/RatingToolTip";
import {
  getOneProduct,
  reviewProduct,
} from "../features/products/productSlice";
import { priceWithCommas } from "../utils";
import ReviewModal from "../components/ReviewModal";
import ReviewsList from "../components/ReviewsList";

const SingleProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { profile } = useSelector((state) => state.profile);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const formattedPrice = priceWithCommas(Number(product.price));
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getOneProduct({ slug }));
    }
  }, [dispatch, slug]);

  const handleReviewSubmit = async ({ rating, comment, image }) => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (image) formData.append("photo", image);

    await dispatch(reviewProduct({ id: product.id, reviewData: formData }));
    dispatch(getOneProduct({ slug }));

    setShowReviewModal(false);
  };

  if (isLoading || !product) {
    return <Spinner />;
  }
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
          <div className="d-flex justify-content-start align-items-center mb-2">
            <Badge bg="success" className="me-2">
              {product.country}, {product.city}
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
              <OverlayTrigger
                placement="bottom"
                show={show}
                target={target.current}
                overlay={<ProductToolTip product={product} />}
              >
                <sub
                  className="ms-1"
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  ({product.review_count} reviews) <IoChevronDown />
                </sub>
              </OverlayTrigger>
            </div>
          </div>
          <h3 style={{ fontWeight: "bold" }}>${formattedPrice}</h3>
          <p>{product.description}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="mt-2">
          <hr className="mb-5"></hr>
          <div className="d-flex aligh-items-center justify-content-center">
            <h2>Customer Reviews</h2>
            <Button
              className="ms-4"
              variant="primary"
              onClick={() => {
                if (profile.username) {
                  setShowReviewModal(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              Leave a Review
            </Button>
          </div>
          <ReviewsList reviews={product.reviews || []} />
          <ReviewModal
            show={showReviewModal}
            handleClose={() => setShowReviewModal(false)}
            submitReview={handleReviewSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProductPage;
