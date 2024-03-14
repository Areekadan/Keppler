import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FeatureSection = ({ backgroundColor, features }) => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: backgroundColor,
        padding: "4rem 0",
      }}
    >
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col key={index} md={4} className="text-center">
            <h2 className="h4">{feature.title}</h2>
            <p>{feature.description}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeatureSection;
