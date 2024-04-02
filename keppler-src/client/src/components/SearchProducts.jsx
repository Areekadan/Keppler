import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const payload = { catch_phrase: searchQuery };
    try {
      await dispatch(searchProducts(payload));
      navigate("/products/search");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  return (
    <Form
      onSubmit={handleSearchSubmit}
      className="d-flex justify-content-center align-items-center w-100"
    >
      <h4 className="me-2 mb-0" style={{ color: "#2190FF" }}>
        Search
      </h4>
      <div style={{ position: "relative", width: "70%" }}>
        <FormControl
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", height: "40px" }}
        />
        <IoSearchSharp className="search-icon" />
      </div>
    </Form>
  );
};

export default SearchComponent;
