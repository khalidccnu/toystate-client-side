import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";
import { addCart, getCart, removeCart } from "../utils/index.js";

const AllToy = ({ idx, toy }) => {
  const {
    _id: id,
    name,
    price,
    quantity,
    category_name: category,
    seller_name: seller,
  } = toy;
  const [isCart, setCart] = useState(false);
  const navigate = useNavigate();

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
    id in getCart() ? setCart(true) : null;
  }, []);

  return (
    <tr>
      <th>{++idx}</th>
      <td>{name}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td>{category}</td>
      <td>{seller}</td>
      <td>
        <span className="inline-flex gap-x-1">
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
          <FaArrowCircleRight
            className="hover:text-pink-600 cursor-pointer"
            onClick={(_) => navigate("/all-toys/view-toy/" + id)}
          />
        </span>
      </td>
    </tr>
  );
};

export default AllToy;
