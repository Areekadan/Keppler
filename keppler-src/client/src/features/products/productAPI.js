import api from "../api";

const getProducts = async () => {
  const response = await api.get("/products/all/");
  return response.data;
};

const getOneProduct = async (slug) => {
  const response = await api.get(`/products/details/${slug}/`);
  return response.data;
};

const productAPI = { getProducts, getOneProduct };

export default productAPI;
