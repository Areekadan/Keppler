import api from "../api";

const getProducts = async () => {
  const response = await api.get("/products/all/");
  return response.data;
};

const getOneProduct = async (slug) => {
  const response = await api.get(`/products/details/${slug}/`);
  return response.data;
};

const reviewProduct = async (id, reviewData) => {
  const response = await api.post(`/reviews/${id}/`, reviewData);
  return response.data;
};

const getSellerProducts = async () => {
  const response = await api.get("/products/sellers/");
  return response.data;
};

const updateProduct = async (slug, productData) => {
  const response = await api.put(`/products/update/${slug}/`, productData);
  return response.data;
};

const uploadProductImages = async (productData) => {
  const response = await api.post("/products/upload-image/", productData);
  return response.data;
};

const productAPI = {
  getProducts,
  getOneProduct,
  reviewProduct,
  getSellerProducts,
  updateProduct,
  uploadProductImages,
};

export default productAPI;
