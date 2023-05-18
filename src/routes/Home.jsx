import React from "react";
import { useLoaderData } from "react-router-dom";
import HomeBanner from "../components/HomeBanner.jsx";
import CategoryToys from "../components/CategoryToys.jsx";
import WhatToyStateOffers from "../components/WhatToyStateOffers.jsx";

const Home = () => {
  const categories = useLoaderData();

  return (
    <>
      <HomeBanner />
      <CategoryToys categories={categories} />
      <WhatToyStateOffers />
    </>
  );
};

export default Home;
