import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Product from "../components/Product";
import { getProducts } from "../features/products/productSlice";
import Title from "../components/Title";
import FilterComponent from "../components/ProductsFilter";
import { FaSearch } from "react-icons/fa";

const ProductsPage = () => {
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }
    dispatch(getProducts());
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
        <Row>
          <Col className="ms-0 mg-top" md={3}>
            <h5>Filter by</h5>
            <FilterComponent />
          </Col>
          <Col md={9}>
            <Row className="justify-content-center">
              <Col lg={12} className="text-center">
                <h1 className="text-center mb-4">Globally Sourced Products</h1>
                <hr className="my-2" />
              </Col>
            </Row>
            {products.length === 0 ? (
              <Row className="justify-content-center">
                <Col lg={6} md={8} sm={12} className="text-center">
                  <h3 className="notfound">No Products Match Your Search</h3>
                  <FaSearch size={50} className="text-primary my-3" />
                  <p>
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </Col>
              </Row>
            ) : (
              <Row className="mt-3">
                {products.map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductsPage;
