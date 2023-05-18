import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Toy from "./Toy.jsx";

const DiscountToys = ({ discount }) => {
  return (
    <section className="py-10 text-center">
      <div className="container">
        <h3 className="font-bold text-2xl mb-10">Discount Toys</h3>
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
      </div>
    </section>
  );
};

export default DiscountToys;
