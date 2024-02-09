import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  NavbarBrand,
} from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const topNavbarRef = useRef(null);
  const [topNavbarHeight, setTopNavbarHeight] = useState(0);

  useEffect(() => {
    const updateTopNavbarHeight = () => {
      if (topNavbarRef.current) {
        setTopNavbarHeight(topNavbarRef.current.clientHeight);
      }
    };
    updateTopNavbarHeight();
    window.addEventListener("resize", updateTopNavbarHeight);
    return () => window.removeEventListener("resize", updateTopNavbarHeight);
  }, []);
  return (
    <>
      <header>
        <Navbar
          ref={topNavbarRef}
          fixed="top"
          expand={true}
          collapseOnSelect
          className="bg-body-tertiary"
          style={{ zIndex: 1020 }}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Button
              className="full-height-button"
              style={{
                backgroundColor: "#FFF",
                color: "#2190FF",
                borderColor: "white",
                borderRadius: 0,
                padding: 8,
              }}
            >
              All
              <GiHamburgerMenu style={{ marginLeft: 4 }} />
            </Button>
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="me-auto">
                <NavDropdown
                  title="Countries"
                  className="nav-adjusted"
                  id="basic-nav-dropdown"
                ></NavDropdown>
                <LinkContainer to="">
                  <Nav.Link>Deals</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/products">
                  <Nav.Link>Most Popular</Nav.Link>
                </LinkContainer>
                <NavDropdown
                  title="Products"
                  id="basic-nav-dropdown"
                ></NavDropdown>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link>Cart</Nav.Link>
                <Nav.Link>Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar
          fixed="top"
          expand="lg"
          collapseOnSelect
          className="bg-body-tertiary search-bar"
          style={{
            top: `${topNavbarHeight}px`,
            zIndex: 1010,
          }}
        >
          <Container>
            <Form className="d-flex justify-content-center align-items-center w-100">
              {/* <NavbarBrand as="h1" className="me-2 mb-0">
                Keppler
              </NavbarBrand> */}
              <h4 className="me-2 mb-0" style={{ color: "#2190FF" }}>
                Search
              </h4>
              <div
                style={{
                  position: "relative",
                  width: "70%",
                }}
              >
                <FormControl
                  type="search"
                  aria-label="Search"
                  // placeholder="Keppler"
                  style={{ width: "100%", height: "40px" }}
                />
                <IoSearchSharp className="search-icon" />
              </div>
            </Form>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
