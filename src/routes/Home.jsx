import React from "react";
import useTitle from "../hooks/useTitle.js";
import HomeBanner from "../components/HomeBanner.jsx";
import CategoryToys from "../components/CategoryToys.jsx";
import WhatToyStateOffers from "../components/WhatToyStateOffers.jsx";
import DiscountToys from "../components/DiscountToys.jsx";
import Gallery from "../components/Gallery.jsx";

const Home = () => {
  useTitle("Home");

  return (
    <>
      <HomeBanner />
      <CategoryToys />
      <WhatToyStateOffers />
      <DiscountToys />
      <Gallery />
    </>
  );
};

export default Home;
