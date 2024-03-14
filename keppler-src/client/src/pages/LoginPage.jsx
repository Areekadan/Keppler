import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { login, reset } from "../features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide an email");
    }
    if (!password) {
      toast.error("Please enter a password");
    }
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Title
        title="Sign In to Keppler - Access Global Shopping"
        description="Log in to your Keppler account to start shopping globally or manage your listings. Access a world of products and opportunities."
        keywords="sign in, Keppler login, global shopping account, online marketplace access, manage listings, international shopping, Keppler account login"
      />
      <Container className="mg-top">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="login-form-container p-4 shadow-sm">
              <h2 className="text-center mb-4">Sign In</h2>
              <p className="text-muted text-center mb-4">
                Access your Keppler account
              </p>
              <Form onSubmit={submitHandler} className="login-form">
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit">
                    Sign In
                  </Button>
                </div>
              </Form>
              <div className="mt-4 text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
