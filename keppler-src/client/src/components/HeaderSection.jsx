import React from "react";
import { Container } from "react-bootstrap";

const HeaderSection = ({
  backgroundImage,
  title,
  subtitle,
  containerStyle,
}) => {
  return (
    <>
      <Container
        fluid
        className={`${containerStyle} hero-section`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "55vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 fw-bold text-white">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </Container>
    </>
  );
};

export default HeaderSection;
