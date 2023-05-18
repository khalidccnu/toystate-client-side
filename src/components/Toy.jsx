import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { addCart, getCart, removeCart } from "../utils/index.js";

const Toy = ({ toy }) => {
  const [isCart, setCart] = useState(false);
  const navigate = useNavigate();
  const { _id: id, name, price, discount, rating, img } = toy;
  const [discountPrice, setDiscountPrice] = useState(null);

  const handleAddCart = (id, name) => {
    addCart(id, true);
    toast.success(name + " has been added to cart.");
    setCart(true);
  };

  const handleRemoveCart = (id, name) => {
    removeCart(id, true);
    toast.warn(name + " has been removed from cart.");
    setCart(false);
  };

  useEffect((_) => {
    discount ? setDiscountPrice(Math.round(price * 0.5)) : null;
  }, []);

  useEffect((_) => {
    id in getCart() ? setCart(true) : null;
  }, []);

  return (
    <>
      <figure className="relative">
        <img src={img} alt="" />
        <div className="absolute top-4 left-4 flex opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {isCart ? (
            <span
              className="hover:text-pink-600 cursor-pointer"
              onClick={(_) => handleRemoveCart(id, name)}
            >
              <BsFillCartDashFill />
            </span>
          ) : (
            <span
              className="hover:text-pink-600 cursor-pointer"
              onClick={(_) => handleAddCart(id, name)}
            >
              <BsFillCartPlusFill />
            </span>
          )}
        </div>
        {discount ? (
          <span className="absolute top-4 right-4 badge badge-primary">
            Sale
          </span>
        ) : null}
        <div className="absolute bottom-3 left-0 end-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            type="button"
            className="btn btn-sm px-5 bg-[#35bef0] border-none rounded normal-case"
            onClick={(_) => navigate("/all-toys/view-toy/" + id)}
          >
            View Details
          </button>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
        <small className="inline-flex justify-center -mt-3 mb-3 text-[0.6rem] text-yellow-400">
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              return idx < Math.trunc(rating) ? (
                <FaStar key={idx} />
              ) : !Number.isInteger(rating) && idx === Math.trunc(rating) ? (
                <FaStarHalfAlt key={idx} />
              ) : (
                <FaRegStar key={idx} />
              );
            })}
        </small>
        <span className="font-semibold">
          <span>$</span>
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
      </div>
    </>
  );
};

export default Toy;
