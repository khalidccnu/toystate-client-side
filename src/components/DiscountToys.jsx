import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Toy from "./Toy.jsx";

const DiscountToys = () => {
  const [isLoading, setLoading] = useState(true);
  const [discount, setDiscount] = useState([]);

  useEffect((_) => {
    fetch(`${import.meta.env.VITE_API_LINK}/toys/discount`)
      .then((response) => response.json())
      .then((result) => {
        setDiscount(result);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 text-center">
      <div className="container">
        <h3 className="font-bold text-2xl mb-10">Discount Toys</h3>
        {!isLoading ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: false }}
            slidesPerView="1"
            spaceBetween="50"
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {discount.map((toy) => (
              <SwiperSlide
                key={toy["_id"]}
                className="group card card-compact bg-sky-50 hover:bg-sky-200/60 h-auto transition-[background-color] duration-500"
              >
                <Toy key={toy["_id"]} toy={toy} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Rings
            width="50"
            height="50"
            color="#35bef0"
            wrapperClass="justify-center"
          />
        )}
      </div>
    </section>
  );
};

export default DiscountToys;
