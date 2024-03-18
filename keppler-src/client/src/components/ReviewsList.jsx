import React, { useState } from "react";
import {
  Card,
  Badge,
  Image,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import StarRating from "./StarRating";
import { formatDate } from "../utils";

const ReviewsList = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      {currentReviews.length > 0 ? (
        currentReviews.map((review, index) => (
          <Card
            key={index}
            className="mb-3 review-card"
            style={{ border: "none" }}
          >
            <Card.Body>
              <div className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <StarRating rating={review.rating} />
                  <sub className="mb-0 ms-2">
                    {"- " + review.rating + " stars out of 5"}
                  </sub>
                </div>
                {review.photo && (
                  <Card.Img
                    style={{
                      maxWidth: "400px",
                      maxHeight: "200px",
                      marginTop: "10px",
                    }}
                    src={review.photo}
                    alt="Review"
                  />
                )}
                <Card.Text className="mt-2">
                  {'"' + review.comment + '"'}
                </Card.Text>
              </div>
              <Row className="align-items-center mb-2">
                <Col xs={2} md={1} className="d-flex justify-content-start">
                  {review.reviewer_profile_photo ? (
                    <Image
                      src={review.reviewer_profile_photo}
                      roundedCircle
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <Badge
                      bg="light"
                      text="dark"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25em",
                      }}
                    >
                      {review.reviewer.charAt(0).toUpperCase()}
                    </Badge>
                  )}
                </Col>
                <Col xs={10} md={11}>
                  <footer className="mt-4 blockquote-footer reviewer-name">
                    @{review.reviewer} on{" "}
                    <cite title="Source Title">
                      {formatDate(review.created_at)}
                    </cite>
                  </footer>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center mt-4 p-2">
          <h4>No reviews yet.</h4>
          <p style={{ color: "silver", fontSize: "medium" }}>
            Be the first to leave a review!
          </p>
        </div>
      )}

      <Pagination className="justify-content-center my-4">
        {currentPage > 1 && (
          <Pagination.Item
            onClick={() => paginate(currentPage - 1)}
            style={{ cursor: "pointer" }}
          >
            Prev
          </Pagination.Item>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
            className=".pagination-item"
          >
            {index + 1}
          </Pagination.Item>
        ))}

        {currentPage < totalPages && (
          <Pagination.Item
            onClick={() => paginate(currentPage + 1)}
            style={{ cursor: "pointer" }}
          >
            Next
          </Pagination.Item>
        )}
      </Pagination>
    </Container>
  );
};

export default ReviewsList;
