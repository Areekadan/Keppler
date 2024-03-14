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
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const topNavbarRef = useRef(null);
  const [topNavbarHeight, setTopNavbarHeight] = useState(0);
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
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
                <LinkContainer className="nav-adjusted" to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <NavDropdown
                  title="Countries"
                  id="basic-nav-dropdown"
                ></NavDropdown>
                <NavDropdown title="Products" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/products">
                    All Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Most Popular
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Deals</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {user ? (
                <Nav>
                  <NavDropdown
                    title={
                      profile?.first_name ? profile?.first_name : "Welcome"
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Sign Out
                    </NavDropdown.Item>
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
                  <Nav.Link>
                    <HiOutlineShoppingBag
                      style={{ fontSize: "22px", color: "#ffc107" }}
                    />
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <Nav.Link>
                    <HiOutlineShoppingBag
                      style={{ fontSize: "22px", color: "#ffc107" }}
                    />
                  </Nav.Link>
                </Nav>
              )}
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
