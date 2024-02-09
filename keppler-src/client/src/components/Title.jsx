import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Title.defaultProps = {
  title: "Keppler",
  description:
    "Shop anywhere in the world without leaving the comfort of your home",
  keywords:
    "international online shopping, global marketplace, worldwide delivery shopping, buy products internationally, online shopping worldwide shipping",
};

export default Title;
