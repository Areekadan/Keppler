import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Product from "../components/Product";
import { getProducts } from "../features/products/productSlice";

const ProductsPage = () => {
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProducts());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="mg-top text-center">
            <h1>All Products</h1>
            <hr className="hr-text" />
          </Col>
        </Row>
        {
          <>
            <Row className="mt-3">
              {products.map((product) => (
                <Col key={product.id} sm={12} md={4} lg={3} xl={3}>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          </>
        }
      </Container>
    </>
  );
};

export default ProductsPage;
