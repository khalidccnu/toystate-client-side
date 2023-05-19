import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import imgHomeDelivery from "../assets/home-delivery.png";
import imgPayment from "../assets/payment.png";
import imgSupport from "../assets/support.png";

const WhatToyStateOffers = () => {
  useEffect((_) => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <section className="pb-10 text-center">
      <div className="container">
        <h3 className="font-bold text-2xl mb-10">What ToyState Offers!</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div
            className="card card-compact bg-sky-50 border border-sky-200 shadow-sm"
            data-aos="fade-right"
          >
            <figure>
              <img src={imgHomeDelivery} alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">Home Delivery</h2>
            </div>
          </div>
          <div
            className="card card-compact bg-sky-50 border border-sky-200 shadow-sm"
            data-aos="zoom-in"
          >
            <figure>
              <img src={imgPayment} alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">Cash on Delivery</h2>
            </div>
          </div>
          <div
            className="card card-compact bg-sky-50 border border-sky-200 shadow-sm"
            data-aos="fade-left"
          >
            <figure>
              <img src={imgSupport} alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">24/7 Support</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToyStateOffers;
