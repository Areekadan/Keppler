import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { FaSearch } from "react-icons/fa";

const SearchResults = () => {
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

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
          {products.length === 0 && (
            <Col lg={6} md={8} sm={12} className="text-center">
              <h3 className="notfound">No Products Match Your Search</h3>
              <FaSearch size={50} className="text-primary my-3" />{" "}
              <p>
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </Col>
          )}
        </Row>
        <Row className="mt-3">
          {products.map((product) => (
            <Col key={product.id} sm={12} md={4} lg={3} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
