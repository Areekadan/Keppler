import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { register, reset } from "../features/auth/authSlice";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success(
        "An account activation email has been sent to the email you provided."
      );
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      toast.error("Passwords Do Not Match.");
    } else {
      const userData = {
        username,
        first_name,
        last_name,
        email,
        password,
        re_password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Title
        title="Create Your Keppler Account - Join Our Global Marketplace"
        description="Register to start exploring, buying, and selling on Keppler. Join our community and connect with a worldwide audience."
        keywords="register, global marketplace, create account, Keppler registration, join Keppler, international shopping, sell worldwide"
      />
      <Container className="mg-top">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="register-form-container p-4 shadow-sm">
              <h2 className="text-center mb-4">Register</h2>
              <p className="text-muted text-center mb-4">
                Join the Keppler community today
              </p>
              <Form onSubmit={submitHandler} className="register-form">
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col sm={6} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      value={first_name}
                      onChange={(e) => setFirst_Name(e.target.value)}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      value={last_name}
                      onChange={(e) => setLast_Name(e.target.value)}
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={re_password}
                    onChange={(e) => setRe_Password(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
              <div className="mt-4 text-center">
                Already have an account? <Link to="/login">Sign in here</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
