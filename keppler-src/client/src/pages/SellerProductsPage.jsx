import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Product from "../components/Product";
import { getSellerProducts } from "../features/products/productSlice";
import Title from "../components/Title";

const SellerProductsPage = () => {
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getSellerProducts());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Title
        title="Keppler Product Catalog"
        description="Discover and shop for products from around the world on Keppler. From local crafts to international brands, explore a diverse selection of electronics, fashion, home goods, and more, no matter where you are."
        keywords="global shopping, international product catalog, worldwide marketplace, online shopping, electronics, fashion, home goods, international brands, local crafts, Keppler products"
      />
      <Container className="mg-top">
        <Row className="justify-content-center">
          <Col lg={6} md={8} sm={12} className="text-center">
            <h1 className="text-center mb-4">My Products</h1>
            <hr className="my-2" />
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

export default SellerProductsPage;
