import React from "react";
import { useLoaderData } from "react-router-dom";
import HomeBanner from "../components/HomeBanner.jsx";
import CategoryToys from "../components/CategoryToys.jsx";
import WhatToyStateOffers from "../components/WhatToyStateOffers.jsx";
import DiscountToys from "../components/DiscountToys.jsx";

const Home = () => {
  const [categories, discount] = useLoaderData();

  return (
    <>
      <HomeBanner />
      <CategoryToys categories={categories} />
      <WhatToyStateOffers />
      <DiscountToys discount={discount} />
    </>
  );
};

export default Home;
