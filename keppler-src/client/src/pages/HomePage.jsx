import React from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Title from "../components/Title";

const HomePage = () => {
  return (
    <>
      <Title />
      <div
        className="d-flex flex-column "
        style={{
          width: "100%",
          height: "150vh",
        }}
      >
        <div className="bg-image-container" style={{ height: "45vh" }}>
          <header className="mg-top masthead main-bg-image">
            <Container
              className="d-flex align-items-left justify-content-left pt-4"
              style={{ height: "100%" }}
            >
              <div className="text-center">
                <h6 style={{ color: "#4A4A4A" }}>
                  "Shop anywhere in the world
                </h6>
                <h6 style={{ color: "#4A4A4A" }}>
                  without leaving the comfort of your home"
                </h6>
                <h1 style={{ color: "#FFF" }} className="text-uppercase pt-2">
                  Keppler
                </h1>
              </div>
            </Container>
          </header>
        </div>
        <div className="bg-image-container">
          <header
            style={{
              height: "40vh",
              backgroundColor: "#AEDBF2",
            }}
          >
            &nbsp;
          </header>
        </div>
        <div className="bg-image-container">
          <header
            style={{
              height: "25vh",
              backgroundColor: "#BEE2F4",
            }}
          >
            &nbsp;
          </header>
        </div>
      </div>
      {/* <Container className="d-flex align-items-bottom justify-content-center">
        <div className="popular-places">
          <div className="text-left">
            <h5 className="ms-2 mt-2">Most Popular Places Right Now</h5>
          </div>
        </div>
      </Container>
      <Container className="d-flex align-items-bottom justify-content-center">
        <div className="best-deals">
          <div className="text-left">
            <h5 className="ms-2 mt-2">Todays Best Deals</h5>
          </div>
        </div>
      </Container> */}
    </>
  );
};

export default HomePage;
