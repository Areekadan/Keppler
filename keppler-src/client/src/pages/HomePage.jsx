import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../components/Title";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import heroImage from "../images/homeImage.jpeg";
import CountryCards from "../components/CountryCards";
import DealCards from "../components/DealCards";
import SingleCard from "../components/SingleCard";

const HomePage = () => {
  const features = [
    {
      title: "Global Products",
      description: "Access a wide range of products from around the globe.",
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence with our secure payment system.",
    },
    {
      title: "Fast Shipping",
      description: "Enjoy fast and reliable shipping to your doorstep.",
    },
  ];
  return (
    <>
      <Title
        title="Welcome to Keppler - Your Gateway to Global Shopping"
        description="Explore Keppler's global marketplace and discover a vast selection of products from around the world. Whether you're looking for the latest electronics, unique crafts, fashion trends, or home essentials, Keppler brings the world's markets to your doorstep."
        keywords="global marketplace, international shopping, online shopping, worldwide delivery, electronics, fashion, crafts, home essentials, Keppler shopping"
      />
      <Container fluid className="home-container mg-top px-5">
        <HeroSection
          containerStyle={
            "text-center d-flex align-items-start justify-content-start"
          }
          backgroundImage={heroImage}
          subtitle="Shop anywhere in the world without leaving the comfort of your home."
        />
        <div className="overlay-content">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={10}>
              <CountryCards />
              <div className="home-cards-spacing">
                <DealCards />
              </div>
              <div className="home-cards-spacing">
                <SingleCard />
              </div>
            </Col>
          </Row>
        </div>
        <div className="background-container">
          <Row>
            <Col>
              <div className="home-background1"></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="home-background2"></div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default HomePage;
