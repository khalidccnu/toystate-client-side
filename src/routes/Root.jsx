import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useScrollReset from "../hooks/useScrollReset.js";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Nav from "../components/Nav.jsx";
import Spinner from "../components/Spinner.jsx";
import Footer from "../components/Footer.jsx";

const Root = () => {
  useScrollReset();

  return (
    <>
      <Nav />
      <Spinner>
        <Outlet />
      </Spinner>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Root;
