import React, { useRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { truncateText } from "../utils";

const countries = [
  {
    name: "Italy",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_it-flag.gif",
  },
  {
    name: "Bangladesh",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_bg-flag.gif",
  },
  {
    name: "Ukraine",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_up-flag.gif",
  },
  {
    name: "Japan",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_ja-flag.gif",
  },
  {
    name: "Egypt",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_eg-flag.gif",
  },
  {
    name: "Morocco",
    flagUrl: "https://www.worldometers.info//img/flags/small/tn_mo-flag.gif",
  },
];

const CountryCards = () => {
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
      <h2 className="home-card-main-title">Explore Products by Country</h2>
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
          {countries.map((country, index) => (
            <Col key={index} xs={4} md={4} lg={3} className="flex-nowrap">
              <Card className="home-country-card d-flex align-items-center">
                <Card.Title className="home-card-title">
                  {truncateText(country.name, 15)}
                </Card.Title>
                <Card.Img variant="top" src={country.flagUrl} />
                <Card.Body className="d-flex align-items-center justify-content-center home-card-body">
                  <Link style={{ color: "#2190FF" }}>Shop Now</Link>
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

export default CountryCards;
