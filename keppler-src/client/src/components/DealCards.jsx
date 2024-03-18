import React, { useRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { truncateText } from "../utils";

const deals = [
  {
    name: "Bridal Jewelry",
    imgUrl:
      "https://assets.vogue.in/photos/5ea1660428845e0008c7ecfd/2:3/w_1600,c_limit/Bridal-gold-jewellery.jpg",
    country: "India",
    sale: "25%",
  },
  {
    name: "Borsalino Hats",
    imgUrl:
      "https://images.fastfashionnews.co.uk/wp-content/uploads/2022/09/Borsalino-hats.png",
    country: "Italy",
    sale: "15%",
  },
  {
    name: "Persian Rugs",
    imgUrl:
      "https://www.catalinarug.com/wp-content/uploads/2023/10/Woman-weaving-a-carpet-600x600.png",
    country: "Iran",
    sale: "40%",
  },
  {
    name: "Winter Wear",
    imgUrl:
      "https://www.8848altitude.com/eu/pub_docs/files/MountainstyleWorkinprogress/Mountain_Style_Ski_Hero_1600x900.jpg?extend=copy&width=2048&method=fit&height=1152&type=webp",
    country: "Canada",
    sale: "20%",
  },
  {
    name: "Japanese Sword",
    imgUrl:
      "https://www.thoughtco.com/thmb/VAnBWluUA7K1TJJ8-O7hk3a1Cio=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-814108654-78d4413a438a4dbaa4e3dba73267a045.jpg",
    country: "Japan",
    sale: "35%",
  },
  {
    name: "Natural Diamond",
    imgUrl:
      "https://sites.uab.edu/humanrights/files/2019/11/diamond-workers.jpg",
    country: "Africa",
    sale: "40%",
  },
];

const DealCards = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Container fluid className="home-card-container">
      <h2 className="home-card-main-title">Todays Best Deals</h2>
      <div className="d-flex align-items-center">
        <div className="d-flex justify-content-center align-items-center home-card-button-wrapper">
          <Button
            className="d-flex align-items-center"
            variant="link"
            onClick={() => scroll("left")}
          >
            <GoChevronLeft className="home-card-chevron" />
          </Button>
        </div>
        <Row ref={scrollContainerRef} className="flex-nowrap overflow-hidden">
          {deals.map((deal, index) => (
            <Col key={index} xs={4} md={4} lg={4} className="flex-nowrap">
              <Card className="home-deal-card d-flex align-items-center">
                <Card.Title className="home-card-title">
                  {truncateText(deal.name, 15)}
                </Card.Title>
                <Card.Img variant="top" src={deal.imgUrl} />
                {deal.sale && (
                  <div className="d-flex align-items-center justify-content-center home-deal-card-sale">
                    {deal.sale} OFF
                  </div>
                )}
                <Card.Body className="home-card-body">
                  <Link style={{ color: "#2190FF" }}>Shop {deal.country}</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center align-items-center home-card-button-wrapper">
          <Button
            className="d-flex align-items-center"
            variant="link"
            onClick={() => scroll("right")}
          >
            <GoChevronRight className="home-card-chevron" />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default DealCards;
