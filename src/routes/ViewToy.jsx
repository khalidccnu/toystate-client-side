import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle.js";
import { addCart, getCart } from "../utils/index.js";
import RelatedToys from "../components/RelatedToys.jsx";

const ViewToy = () => {
  const toy = useLoaderData();
  const { _id: id, category_id, name, price, seller, img, discount } = toy;
  useTitle(name);
  const [isCart, setCart] = useState(false);
  const [category, setCategory] = useState("");
  const [discountPrice, setDiscountPrice] = useState(null);

  const handleAddCart = (id, name) => {
    addCart(id, true);
    toast.success(name + " has been added to cart.");
    setCart(true);
  };

  useEffect((_) => {
    discount ? setDiscountPrice(Math.round(price * 0.5)) : null;
  }, []);

  useEffect((_) => {
    id in getCart() ? setCart(true) : null;
  }, []);

  useEffect((_) => {
    fetch(`${import.meta.env.VITE_API_LINK}/categories?id=${category_id}`)
      .then((response) => response.json())
      .then((result) => setCategory(result.name));
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 max-w-sm sm:max-w-2xl mx-auto">
          <div className="card sm:card-side card-compact bg-sky-50 hover:bg-sky-200/60 transition-[background-color] duration-500">
            <figure className="relative sm:max-w-[15rem]">
              <img src={img} alt="" />
              {discount ? (
                <span className="absolute top-4 left-4 badge badge-primary">
                  Sale
                </span>
              ) : null}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <span className="font-semibold">
                <span>Price: $</span>
                <span>
                  {discountPrice ? (
                    <>
                      <span className="text-lg">{discountPrice}</span>
                      <span className="text-pink-600 line-through decoration-pink-600">
                        {price}
                      </span>
                    </>
                  ) : (
                    price
                  )}
                </span>
              </span>
              <span className="font-semibold">Category: {category}</span>
              <span className="font-semibold">Seller: {seller}</span>
              <div className="card-actions items-center mt-5">
                {isCart ? (
                  <button
                    type="button"
                    className="btn btn-sm px-5 border-none rounded normal-case"
                    disabled={true}
                  >
                    Already added!
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm px-5 bg-[#35bef0] border-none rounded normal-case"
                    onClick={(_) => handleAddCart(id, name)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <RelatedToys categoryId={category_id} toyId={id} />
      </div>
    </section>
  );
};

export default ViewToy;
