import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };
  return (
    <footer className="mt-auto py-4 footer">
      <Container>
        <div className="call-to-action-section text-center mb-4">
          <h2 className="h4">Ready to Explore?</h2>
          <p>Join us now and start your global shopping journey today.</p>
          <Link to="/register">
            <Button
              className="button-hover-effect"
              style={{
                backgroundColor: "#ffc107",
                borderColor: "#080065",
                color: "black",
              }}
              size="lg"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
        <Row className="justify-content-center">
          <Col md={4} className="text-center py-2">
            <strong>Quick Links</strong>
            <ul className="list-unstyled mt-2">
              <li>
                <Link to="/about" style={linkStyle}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" style={linkStyle}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" style={linkStyle}>
                  FAQs
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center py-2">
            <strong>Follow Us</strong>
            <ul className="list-unstyled mt-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center py-2">
            <strong>Contact Info</strong>
            <p className="mt-2 mb-0">Email: info@keppler.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 border-top">
            © Keppler {new Date().getFullYear()}. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
