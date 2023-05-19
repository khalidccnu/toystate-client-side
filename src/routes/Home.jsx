import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";
import HomeBanner from "../components/HomeBanner.jsx";
import CategoryToys from "../components/CategoryToys.jsx";
import WhatToyStateOffers from "../components/WhatToyStateOffers.jsx";
import DiscountToys from "../components/DiscountToys.jsx";
import Gallery from "../components/Gallery.jsx";

const Home = () => {
  useTitle("Home");
  const [categories, discount] = useLoaderData();

  return (
    <>
      <HomeBanner />
      <CategoryToys categories={categories} />
      <WhatToyStateOffers />
      <DiscountToys discount={discount} />
      <Gallery />
    </>
  );
};

export default Home;
