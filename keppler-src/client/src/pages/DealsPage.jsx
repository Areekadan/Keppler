import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import HeaderSection from "../components/HeaderSection";
import Product from "../components/Product";
import { getProducts } from "../features/products/productSlice";

const dealContent = [
  {
    name: "Bridal Jewelry",
    imgUrl:
      "https://flywith.virginatlantic.com/content/dam/destinations/asia/India%20Banner.jpg",
    country: "India",
    sale: "25%",
  },
  {
    name: "Borsalino Hats",
    imgUrl:
      "https://cdn.kimkim.com/files/a/images/883e09af9f01e59a34ad3af6e13203450b8d7095/original-465a6f2de6f9b6a9cea4522162f26de1.jpg",
    country: "Italy",
    sale: "15%",
  },
  {
    name: "Persian Rugs",
    imgUrl:
      "https://media.cnn.com/api/v1/images/stellar/prod/141024172337-amazing-iranian-mosque-photos-16.jpg?q=w_3200,h_1758,x_0,y_0,c_fill",
    country: "Iran",
    sale: "40%",
  },
  {
    name: "Winter Wear",
    imgUrl:
      "https://cottagelife.com/wp-content/uploads/2019/12/shutterstock_1528990841.jpg",
    country: "Canada",
    sale: "20%",
  },
  {
    name: "Chef Knives",
    imgUrl:
      "https://www.thoughtco.com/thmb/VAnBWluUA7K1TJJ8-O7hk3a1Cio=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-814108654-78d4413a438a4dbaa4e3dba73267a045.jpg",
    country: "Japan",
    sale: "35%",
  },
  {
    name: "Natural Diamond",
    imgUrl:
      "https://sites.uab.edu/humanrights/files/2019/11/diamond-workers.jpg",
    country: "Africa",
    sale: "40%",
  },
];

const DealsPage = () => {
  const { locations, products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const { country } = useParams();
  const deal = dealContent.find(
    (content) => content.country.toLowerCase() === country.toLowerCase()
  );
  const countryID = locations.countries.find(
    (location) => location.name === country
  )?.id;
  const queryParams = { country: countryID };
  useEffect(() => {
    window.scrollTo(0, 0);
    // if (isError) {
    //   toast.error(message);
    // }
    dispatch(getProducts(queryParams));
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Title
        title="Keppler Product Catalog"
        description={`Discover and shop for exclusive deals on ${deal?.name} from ${deal?.country} on Keppler.`}
      />
      <Container className="header-section mg-top">
        <HeaderSection
          containerStyle={
            "text-center d-flex align-items-start justify-content-start"
          }
          backgroundImage={deal.imgUrl}
          title={`Exclusive ${deal?.sale} off on ${deal?.name}`}
        />
      </Container>
      <Container className="mt-4">
        <div className="section-highlight">
          <Row className="my-4">
            <Col>
              <h2>
                Why {deal?.name} from {deal?.country}?
              </h2>
              <p>
                Discover the beauty and craftsmanship of {deal?.name}, a true
                gem from {deal?.country}. Each piece tells a story of tradition
                and exquisite craftsmanship.
              </p>
            </Col>
          </Row>
        </div>
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DealsPage;
