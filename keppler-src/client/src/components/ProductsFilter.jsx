import React, { useState } from "react";
import { Accordion, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";

const FilterComponent = () => {
  const selectOptions = {
    advertType: [
      "Preorder",
      "Limited Edition",
      "Exclusive",
      "Clearance",
      "Used",
      "Refurbished",
      "Handmade",
      "Vintage",
      "Collectible",
      "Customizable",
      "Bundle",
      "Digital Download",
      "Subscription",
      "Other",
    ],
    productType: [
      "Electronics",
      "Books",
      "Clothing",
      "Beauty",
      "Home Appliances",
      "Toys",
      "Sports",
      "Grocery",
      "Automotive",
      "Music",
      "Health",
      "Garden",
      "Pet Supplies",
      "Other",
    ],
    productStatus: ["Active", "Discontinued", "Out of Stock"],
  };
  const priceOptions = [
    { label: "Any", value: "Any" },
    { label: "$0+", value: "$0+" },
    { label: "$50+", value: "$50+" },
    { label: "$100+", value: "$100+" },
    { label: "$500+", value: "$500+" },
    { label: "$1000+", value: "$1000+" },
    { label: "$5000+", value: "$5000+" },
  ];
  const { locations } = useSelector((state) => state.products);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAdvertType, setSelectedAdvertType] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedProductStatus, setSelectedProductStatus] = useState("");
  const [price, setPrice] = useState("");

  const countries = locations.countries;
  const cities = locations.cities;
  const regions = locations.regions;

  const dispatch = useDispatch();

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const queryParams = {
      country: selectedCountry,
      region: selectedRegion,
      city: selectedCity,
      advert_type: selectedAdvertType,
      product_type: selectedProductType,
      product_status: selectedProductStatus,
      price: price,
    };
    dispatch(getProducts(queryParams));
  };

  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Location Filters</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col sm={12} className="mb-3">
                <Form.Group controlId="filterCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={12} className="mb-3">
                <Form.Group controlId="filterRegion">
                  <Form.Label>Region/State</Form.Label>
                  <Form.Select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">Select a region/state</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group controlId="filterCity">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="mt-4"
              variant="primary"
              onClick={handleFilterSubmit}
            >
              Apply Filters
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Category Filters</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col sm={12} className="mb-3">
                <Form.Group controlId="filterAdvert">
                  <Form.Label>Advert Type</Form.Label>
                  <Form.Select
                    value={selectedAdvertType}
                    onChange={(e) => setSelectedAdvertType(e.target.value)}
                  >
                    <option value="">Select an advert type</option>
                    {selectOptions.advertType.map((advert) => (
                      <option key={advert} value={advert}>
                        {advert}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={12} className="mb-3">
                <Form.Group controlId="prodyctType">
                  <Form.Label>Product Catgeory</Form.Label>
                  <Form.Select
                    value={selectedProductType}
                    onChange={(e) => setSelectedProductType(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {selectOptions.productType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group controlId="productStatus">
                  <Form.Label>Product Status</Form.Label>
                  <Form.Select
                    value={selectedProductStatus}
                    onChange={(e) => setSelectedProductStatus(e.target.value)}
                  >
                    <option value="">Select a status</option>
                    {selectOptions.productStatus.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="mt-4"
              variant="primary"
              onClick={handleFilterSubmit}
            >
              Apply Filters
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Price Range</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row>
              <Col sm={12} className="mb-3">
                <Form.Group controlId="filterPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    <option value="">Select a price option</option>
                    {priceOptions.map((price) => (
                      <option key={price.value} value={price.value}>
                        {price.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="mt-4"
              variant="primary"
              onClick={handleFilterSubmit}
            >
              Apply Filters
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FilterComponent;
