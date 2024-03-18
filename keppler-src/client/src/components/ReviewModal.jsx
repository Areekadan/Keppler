import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import InteractiveStarRating from "./InteractiveStarRating";

const ReviewModal = ({ show, handleClose, submitReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  const handleFormSubmit = () => {
    submitReview({ rating, comment, image });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <InteractiveStarRating rating={rating} setRating={setRating} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image (optional)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex text-center align-items-center justify-content-center">
        <Button
          style={{ backgroundColor: "#ffc107", border: "none" }}
          onClick={handleFormSubmit}
        >
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
