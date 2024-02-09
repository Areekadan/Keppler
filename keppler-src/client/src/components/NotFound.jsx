import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaHeartBroken } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h2 className="notfound">Sorry we had trouble finding that page</h2>
          <h3>
            Try a search or go to the{" "}
            <Link to="/" style={{ color: "blue" }}>
              Keppler home page.
            </Link>
          </h3>
          <FaHeartBroken className="broken-heart mt-4"></FaHeartBroken>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
