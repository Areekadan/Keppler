import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { uploadProductImages } from "../features/products/productSlice";

function ProductImageUploader({ product }) {
  const dispatch = useDispatch();

  const [coverPhoto, setCoverPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_id", product.id);
    if (coverPhoto) formData.append("cover_photo", coverPhoto);
    if (photo1) formData.append("photo1", photo1);
    if (photo2) formData.append("photo2", photo2);
    if (photo3) formData.append("photo3", photo3);
    if (photo4) formData.append("photo4", photo4);

    dispatch(uploadProductImages({ productData: formData }));
  };

  return (
    <Container className="mt-4 d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className="mb-4 mt-2">
            <Card className="edit-product-card">
              <Card.Img
                variant="top"
                src={product.cover_photo}
                alt={product.title}
              />
            </Card>
            <Form.Group controlId="formFileCover" className="mb-3">
              <Form.Label>Cover Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPhoto(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Row>
              {[
                { img: product.photo1, setImg: setPhoto1 },
                { img: product.photo2, setImg: setPhoto2 },
                { img: product.photo3, setImg: setPhoto3 },
                { img: product.photo4, setImg: setPhoto4 },
              ].map((item, index) => (
                <Col key={index} xs={6} md={6} lg={6}>
                  <Card className="edit-additional-card mb-3">
                    <Card.Img
                      variant="top"
                      src={item.img}
                      alt={`Product image ${index + 1}`}
                    />
                    <Form.Control
                      type="file"
                      onChange={(e) => item.setImg(e.target.files[0])}
                      className="mt-2"
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Upload Image(s)
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ProductImageUploader;
