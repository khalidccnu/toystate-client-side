import React from "react";
import { useLoaderData } from "react-router-dom";
import HomeBanner from "../components/HomeBanner.jsx";
import CategoryToys from "../components/CategoryToys.jsx";

const Home = () => {
  const categories = useLoaderData();

  return (
    <>
      <HomeBanner />
      <CategoryToys categories={categories} />
    </>
  );
};

export default Home;
