import axios from "axios";

const getProducts = async () => {
  const response = await axios.get("api/v1/products/all/");
  return response.data;
};

const productAPI = { getProducts };

export default productAPI;
