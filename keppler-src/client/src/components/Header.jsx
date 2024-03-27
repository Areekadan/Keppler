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
  Offcanvas,
  Image,
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
  const [showDrawer, setShowDrawer] = useState(false);
  const handleToggleDrawer = () => setShowDrawer(!showDrawer);
  const handleCloseDrawer = () => setShowDrawer(false);
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
              onClick={handleToggleDrawer}
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
                  <LinkContainer to="/products">
                    <NavDropdown.Item>All Products</NavDropdown.Item>
                  </LinkContainer>
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
                  <NavDropdown title={profile?.first_name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>View Profile</NavDropdown.Item>
                    </LinkContainer>
                    {profile?.is_seller === true ? (
                      <>
                        <NavDropdown.Item
                          href={`/${profile.username}/products`}
                        >
                          View My Products
                        </NavDropdown.Item>
                        <NavDropdown.Item href={`/products/add-new`}>
                          Add Product
                        </NavDropdown.Item>
                      </>
                    ) : null}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link className="d-flex align-items-center">
                    Cart
                    <HiOutlineShoppingBag
                      className="ms-2 me-2"
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
          expand={true}
          collapseOnSelect
          className="bg-body-tertiary search-bar"
          style={{
            top: `${topNavbarHeight - 1}px`,
            zIndex: 1010,
          }}
        >
          <NavbarBrand as="h1" className="ms-4 me-0">
            Keppler
          </NavbarBrand>
          <Container>
            <Form className="d-flex justify-content-center align-items-center w-100">
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
                  style={{ width: "100%", height: "40px" }}
                />
                <IoSearchSharp className="search-icon" />
              </div>
            </Form>
          </Container>
        </Navbar>
      </header>
      <Offcanvas
        show={showDrawer}
        onHide={handleCloseDrawer}
        placement="start"
        style={{ width: "20%" }}
      >
        <Offcanvas.Header style={{ backgroundColor: "#ffc107" }} closeButton>
          <Offcanvas.Title className="d-flex align-items-center">
            {profile.profile_photo ? (
              <>
                <Image
                  src={profile.profile_photo}
                  roundedCircle
                  style={{
                    width: "60px",
                    height: "60px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
                {"Hey, " + profile.first_name}
              </>
            ) : (
              "Keppler"
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column">
            <LinkContainer className="drawer-links" to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer className="drawer-links" to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer className="drawer-links" to="/">
              <Nav.Link>Countries</Nav.Link>
            </LinkContainer>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
