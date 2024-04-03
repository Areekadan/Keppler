import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const LocationsDropdown = ({ parentMap, childMap }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCountrySelect = async (ID) => {
    const payload = { [childMap]: ID };
    try {
      await dispatch(searchProducts(payload));
      navigate("/products/search");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <NavDropdown title="Countries" id="basic-nav-dropdown">
      {parentMap.map((item) => (
        <NavDropdown.Item
          key={item.id}
          onClick={() => handleCountrySelect(item.id)}
        >
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LocationsDropdown;
