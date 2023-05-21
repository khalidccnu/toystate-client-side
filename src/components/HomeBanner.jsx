import React from "react";
import { useNavigate } from "react-router-dom";
import imgPattern from "../assets/home-banner-pattern.png";
import imgRackO from "../assets/rack-o.png";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-sky-50">
      <img
        src={imgPattern}
        alt=""
        className="hidden sm:inline absolute top-0 left-0 w-full h-full opacity-5 -scale-x-100"
      />
      <div className="container relative">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center max-w-4xl mx-auto py-8 sm:py-24">
          <div className="sm:mr-5 space-y-3">
            <h1 className="text-3xl font-bold text-[#35bef0]">
              Special offer in Christmas Day
            </h1>
            <p className="text-gray-700">
              It’s all about celebrating with ToyState. Christmas is a time for
              celebration and festivities, a time to come together with loved
              ones and make memories.
            </p>
            <button
              type="button"
              className="btn btn-sm px-5 bg-[#35bef0] border-none rounded normal-case"
              onClick={(_) => navigate("/all-toys")}
            >
              Shop Now
            </button>
          </div>
          <div className="max-w-sm mb-8 sm:mb-0">
            <img src={imgRackO} alt="" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
