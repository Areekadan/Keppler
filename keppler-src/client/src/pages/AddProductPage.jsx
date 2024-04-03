import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import {
  createProduct,
  getProductCountryList,
  getProductRegionList,
  getProductCityList,
} from "../features/products/productSlice";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
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
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    country: "",
    region: "",
    city: "",
    price: "",
    quantity: "",
    tax: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    advert_type: "Other",
    product_type: "Other",
    product_status: "Active",
  });

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photo4, setPhoto4] = useState(null);

  const [coverPhotoPreview, setCoverPhotoPreview] = useState("");
  const [photo1Preview, setPhoto1Preview] = useState("");
  const [photo2Preview, setPhoto2Preview] = useState("");
  const [photo3Preview, setPhoto3Preview] = useState("");
  const [photo4Preview, setPhoto4Preview] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await dispatch(getProductCountryList()).unwrap();
      setCountries(data);
    };

    fetchCountries();
  }, [dispatch]);

  const handleCountryChange = async (e) => {
    const countryID = e.target.value;
    setProductData({ ...productData, country: countryID });

    const data = await dispatch(getProductRegionList({ countryID })).unwrap();
    setRegions(data);
  };

  const handleRegionChange = async (e) => {
    const regionID = e.target.value;
    setProductData({ ...productData, region: regionID });

    const data = await dispatch(getProductCityList({ regionID })).unwrap();
    setCities(data);
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });
    if (coverPhoto) formData.append("cover_photo", coverPhoto);
    if (photo1) formData.append("photo1", photo1);
    if (photo2) formData.append("photo2", photo2);
    if (photo3) formData.append("photo3", photo3);
    if (photo4) formData.append("photo4", photo4);

    try {
      await dispatch(createProduct(formData)).unwrap();
      navigate(`/${profile.username}/products`);
    } catch (error) {
      toast.error(`Failed to update product: ${error.message}`);
    }
  };

  return (
    <Container className="mg-top">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Form onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Create New Product</h1>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="textarea"
                  name="title"
                  required
                  value={productData.title}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  step={0.01}
                  required
                  value={productData.price}
                  onChange={handleInputChange}
                />
              </Col>
              <Col sm={4}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  step={1}
                  value={productData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
              <Col sm={4}>
                <Form.Label>Tax (%)</Form.Label>
                <Form.Control
                  type="number"
                  name="tax"
                  step="0.01"
                  required
                  value={productData.tax}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  required
                  value={productData.country}
                  onChange={handleCountryChange}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Form.Label>Region</Form.Label>
                <Form.Select
                  name="region"
                  required
                  value={productData.region}
                  onChange={handleRegionChange}
                >
                  <option value="">Select a region/state</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Form.Label>City</Form.Label>
                <Form.Select
                  name="city"
                  required
                  value={productData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  name="description"
                  required
                  value={productData.description}
                  onChange={handleInputChange}
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
                      step="0.01"
                      name="length"
                      required
                      value={productData.length}
                      onChange={handleInputChange}
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
                      step="0.01"
                      name="width"
                      required
                      value={productData.width}
                      onChange={handleInputChange}
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
                      step="0.01"
                      name="height"
                      required
                      value={productData.height}
                      onChange={handleInputChange}
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
                      step="0.01"
                      name="weight"
                      required
                      value={productData.weight}
                      onChange={handleInputChange}
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
                    name="advert_type"
                    value={productData.advert_type}
                    onChange={handleInputChange}
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
                    name="product_type"
                    value={productData.product_type}
                    onChange={handleInputChange}
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
                    name="product_status"
                    value={productData.product_status}
                    onChange={handleInputChange}
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
            <Row>
              <Col lg={6} className="mb-4 mt-2">
                <Card className="edit-product-card">
                  <Card.Img
                    variant="top"
                    src={coverPhotoPreview}
                    alt="Cover Preview"
                  />
                </Card>
                <Form.Group controlId="formFileCover" className="mb-3">
                  <Form.Label>Cover Photo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange(
                      setCoverPhoto,
                      setCoverPhotoPreview
                    )}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Row>
                  {[
                    {
                      label: "Photo One",
                      setFile: setPhoto1,
                      preview: photo1Preview,
                      setPreview: setPhoto1Preview,
                    },
                    {
                      label: "Photo Two",
                      setFile: setPhoto2,
                      preview: photo2Preview,
                      setPreview: setPhoto2Preview,
                    },
                    {
                      label: "Photo Three",
                      setFile: setPhoto3,
                      preview: photo3Preview,
                      setPreview: setPhoto3Preview,
                    },
                    {
                      label: "Photo Four",
                      setFile: setPhoto4,
                      preview: photo4Preview,
                      setPreview: setPhoto4Preview,
                    },
                  ].map((photo, index) => (
                    <Col key={index} xs={6} md={6} lg={6}>
                      <Card className="edit-additional-card mb-3">
                        <Card.Img
                          variant="top"
                          src={photo.preview}
                          alt={`${photo.label} Preview`}
                        />
                        <Form.Control
                          type="file"
                          onChange={handleImageChange(
                            photo.setFile,
                            photo.setPreview
                          )}
                          className="mt-2"
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductPage;
