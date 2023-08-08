import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Toy from "./Toy.jsx";

const CategoryToys = () => {
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [toys, setToys] = useState([]);

  useEffect((_) => {
    fetch(`${import.meta.env.VITE_API_LINK}/categories`)
      .then((response) => response.json())
      .then((result) => {
        setCategory(result[0]);
        setCategories(result);
        setLoading(false);
      });
  }, []);

  useEffect(
    (_) => {
      if (category) {
        fetch(`${import.meta.env.VITE_API_LINK}/toys?cid=${category["_id"]}`)
          .then((response) => response.json())
          .then((result) => setToys(result));
      }
    },
    [category]
  );

  return (
    <section className="py-10 text-center">
      <div className="container">
        <h3 className="font-bold text-2xl mb-10">Category Toys</h3>
        {!isLoading ? (
          <>
            <div className="tabs mb-5 flex justify-center space-y-2">
              {categories.map((cat, idx) => (
                <span
                  key={cat["_id"]}
                  className={`tab tab-lifted${
                    category["_id"] === cat["_id"] ? " tab-active" : ""
                  }`}
                  onClick={(_) => setCategory(categories[idx])}
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <Swiper
              className="pb-14"
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
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
              {toys.map((toy) => (
                <SwiperSlide
                  key={toy["_id"]}
                  className="group card card-compact bg-sky-50 hover:bg-sky-200/60 h-auto transition-[background-color] duration-500"
                >
                  <Toy key={toy["_id"]} toy={toy} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
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

export default CategoryToys;
