import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroSection = ({ backgroundImage, title, subtitle, containerStyle }) => {
  return (
    <>
      <Container
        fluid
        className={`${containerStyle} hero-section`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "75vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content" style={{ maxWidth: "600px" }}>
          <h1 className="display-5 fw-bold text-white">{title}</h1>
          <p>{subtitle}</p>
          <Link to="/products">
            <Button
              className="button-hover-effect hero-button"
              style={{
                backgroundColor: "#ffc107",
                borderColor: "white",
                color: "white",
              }}
              size="lg"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default HeroSection;
