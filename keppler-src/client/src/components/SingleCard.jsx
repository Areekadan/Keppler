import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { truncateText } from "../utils";

const features = [
  {
    name: "New Arrivals",
    imgUrl: "https://c.arvakur.is/frimg/9/31/931577.jpg",
    link: "New Arrivals",
    secondaryTitle: "Iceland Salts",
  },
  {
    name: "Top Products",
    imgUrl:
      "https://i.kinja-img.com/image/upload/3f4f6e9849230fd6b3e65f2862060027.jpg",
    link: "See More",
    secondaryTitle: "Canadian Maple Syrup",
  },
  {
    name: "New Sellers",
    imgUrl:
      "https://imageio.forbes.com/specials-images/imageserve/675172642/pura-ulun-danu-bratan-temple-in-Bali-/960x0.jpg?format=jpg&width=1440",
    link: "Shop Bali",
    secondaryTitle: "Kupu-Kupu Foundation Shop",
  },
];

const SingleCard = () => {
  return (
    <Container fluid className="home-card-container" style={{ border: "none" }}>
      <div className="d-flex align-items-center">
        <Row>
          {features.map((feature, index) => (
            <Col key={index} xs={4} md={4} lg={4}>
              <Card className="home-single-card d-flex align-items-center">
                <h2 className="home-single-card-main-title">{feature.name}</h2>
                <div className="home-single-img-title-container d-flex align-items-center position-relative">
                  <Card.Img variant="top" src={feature.imgUrl} />
                  {feature.secondaryTitle && (
                    <div className="d-flex align-items-center justify-content-center home-single-card-title">
                      {feature.secondaryTitle}
                    </div>
                  )}
                </div>
                <Card.Body className="home-card-body">
                  <Link style={{ color: "#2190FF" }}>{feature.link}</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default SingleCard;
