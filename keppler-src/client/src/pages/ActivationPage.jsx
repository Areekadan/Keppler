import React, { useEffect } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { activate, reset } from "../features/auth/authSlice";

const ActivationPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/login");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);
  const submitHandler = () => {
    const userData = {
      uid,
      token,
    };
    dispatch(activate(userData));
    toast.success(
      "Your email has been successfully authenticated. Please Login."
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Title
        title="Activate Your Keppler Account"
        description="Complete the activation process to start exploring the global marketplace on Keppler. Unlock a world of shopping and selling opportunities."
        keywords="account activation, Keppler account, global marketplace, online shopping, selling online"
      />

      <Container className="mg-top">
        <Row className="justify-content-center">
          <Col lg={6} md={8} sm={12} className="text-center">
            <h2 className="display-4">Welcome to Keppler!</h2>
            <p className="lead">
              Just one more step to start your journey with us.
            </p>
            <hr className="my-4" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={8} className="text-center">
            <Button
              variant="success"
              size="lg"
              className="px-5 py-2"
              onClick={submitHandler}
            >
              Activate My Account
            </Button>
            <p className="mt-4 text-muted">
              Clicking this button will activate your account and redirect you
              to the login page.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActivationPage;
