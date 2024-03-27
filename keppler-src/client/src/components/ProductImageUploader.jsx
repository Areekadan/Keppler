import React, { useState } from "react";
import { Card, Form, Col, Row } from "react-bootstrap";

const ProductImageUpload = ({
  coverPhoto,
  setCoverPhoto,
  additionalPhotos,
}) => {
  const handleImageChange = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  return (
    <>
      <Row>
        <Col lg={6} className="mb-4 mt-2">
          <Card className="product-image-card">
            <Card.Img
              variant="top"
              src={coverPhoto.preview}
              alt="Cover Preview"
            />
            <Form.Group controlId="formFileCover" className="mb-3">
              <Form.Label>Cover Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange(
                  setCoverPhoto,
                  coverPhoto.setPreview
                )}
              />
            </Form.Group>
          </Card>
        </Col>
        <Col lg={6}>
          <Row>
            {additionalPhotos.map((photo, index) => (
              <Col key={index} xs={6} md={6} lg={6}>
                <Card className="product-image-card mb-3">
                  <Card.Img
                    variant="top"
                    src={photo.preview}
                    alt={`Product image ${index + 1}`}
                  />
                  <Form.Control
                    type="file"
                    onChange={handleImageChange(
                      photo.setFile,
                      photo.setPreview
                    )}
                    className="mt-2"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductImageUpload;
