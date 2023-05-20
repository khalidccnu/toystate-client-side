import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight, FaEdit, FaTrash } from "react-icons/fa";

const MyToy = ({ idx, toy }) => {
  const {
    _id: id,
    name,
    price,
    shipping,
    quantity,
    category_name: category,
  } = toy;
  const navigate = useNavigate();

  return (
    <tr>
      <th>{++idx}</th>
      <td>{name}</td>
      <td>${price}</td>
      <td>${shipping}</td>
      <td>{quantity}</td>
      <td>{category}</td>
      <td>
        <span className="inline-flex gap-x-1">
          <FaEdit
            className="hover:text-pink-600 cursor-pointer"
            onClick={(_) => navigate("/all-toys/update-toy/" + id)}
          />
          <FaArrowCircleRight
            className="hover:text-pink-600 cursor-pointer"
            onClick={(_) => navigate("/all-toys/view-toy/" + id)}
          />
          <FaTrash className="hover:text-pink-600 cursor-pointer" />
        </span>
      </td>
    </tr>
  );
};

export default MyToy;
