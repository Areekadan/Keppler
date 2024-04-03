import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/SingleProductPage";
import AddProductPage from "./pages/AddProductPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ActivationPage from "./pages/ActivationPage";
import ProfilePage from "./pages/ProfilePage";
import SearchResults from "./pages/SearchResults";
import Spinner from "./components/Spinner";
import { getProfile } from "./features/profiles/profileSlice";
import {
  getCountriesWithProductsList,
  getRegionsWithProductsList,
  getCitiesWithProductsList,
} from "./features/products/productSlice";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLocations = async () => {
      await dispatch(getCountriesWithProductsList()).unwrap();
      await dispatch(getRegionsWithProductsList()).unwrap();
      await dispatch(getCitiesWithProductsList()).unwrap();
    };

    fetchLocations();
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(getProfile());
    }
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/products/search" element={<SearchResults />} />
          <Route path="/products/add-new" element={<AddProductPage />} />
          <Route
            path={`/${profile.username}/products`}
            element={<SellerProductsPage />}
          />
          <Route path={`/edit-product/:slug`} element={<UpdateProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activate/:uid/:token" element={<ActivationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer theme="light" />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
