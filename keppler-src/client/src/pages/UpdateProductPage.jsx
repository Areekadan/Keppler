import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneProduct,
  updateProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import ProductImageUploader from "../components/ProductImageUploader";
import Spinner from "../components/Spinner";
import Title from "../components/Title";

const UpdateProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tax, setTax] = useState("");
  const [advert_type, setAdvertType] = useState("");
  const [product_type, setProductType] = useState("");
  const [product_status, setProductStatus] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

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

  useEffect(() => {
    if (slug) dispatch(getOneProduct({ slug }));
  }, [dispatch, slug]);

  useEffect(() => {
    if (isError) toast.error(message);
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setCountry(product.country || "");
      setCity(product.city || "");
      setPostalCode(product.postal_code || "");
      setStreetAddress(product.street_address || "");
      setPrice(product.price || "");
      setQuantity(product.quantity || "");
      setTax(product.tax || "");
      setAdvertType(product.advert_type || "");
      setProductType(product.product_type || "");
      setProductStatus(product.product_status || "");
      setLength(product.length || "");
      setWidth(product.width || "");
      setHeight(product.height || "");
      setWeight(product.weight || "");
    }
  }, [isError, message, product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProductData = new FormData();
    const fields = {
      title,
      description,
      country,
      city,
      postal_code,
      street_address,
      price,
      quantity,
      tax,
      advert_type,
      product_type,
      product_status,
      length,
      width,
      height,
      weight,
    };

    Object.keys(fields).forEach((key) =>
      updatedProductData.append(key, fields[key])
    );

    try {
      await dispatch(
        updateProduct({ slug, productData: updatedProductData })
      ).unwrap();
      navigate(`/products/${slug}`);
    } catch (error) {
      toast.error(`Failed to update product: ${error.message}`);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Title title="Update My Product" />
      <Container className="mg-top">
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Form onSubmit={submitHandler}>
              <h1 className="text-center mb-4">Edit Product Details</h1>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="textarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    step="0.01"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Col>
                <Col sm={4}>
                  <Form.Label>Tax (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={tax}
                    step="0.01"
                    onChange={(e) => setTax(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Length (cm)
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        step="0.01"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Width (cm)
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        step="0.01"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Height (cm)
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        step="0.01"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Weight (kg)
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        step="0.01"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Advert Type</Form.Label>
                    <Form.Select
                      value={advert_type}
                      onChange={(e) => setAdvertType(e.target.value)}
                    >
                      {selectOptions.advertType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select
                      value={product_type}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      {selectOptions.productType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Product Status</Form.Label>
                    <Form.Select
                      value={product_status}
                      onChange={(e) => setProductStatus(e.target.value)}
                    >
                      {selectOptions.productStatus.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button type="submit" variant="primary">
                  Update Product Details
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} lg={8}>
            <ProductImageUploader product={product} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProductPage;
