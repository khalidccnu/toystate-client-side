import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowCircleRight, FaEdit, FaTrash } from "react-icons/fa";

const MyToy = ({ action, setAction, idx, toy }) => {
  const {
    _id: id,
    name,
    price,
    shipping,
    quantity,
    category_name: category,
  } = toy;
  const navigate = useNavigate();

  const handleDeleteToy = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: name + " will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#35bef0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_LINK}/toys?id=${id}`, {
          method: "DELETE",
        }).then((_) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          }).then((_) => setAction(!action));
        });
      }
    });
  };

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
          <FaTrash
            className="hover:text-pink-600 cursor-pointer"
            onClick={(_) => handleDeleteToy(id, name)}
          />
        </span>
      </td>
    </tr>
  );
};

export default MyToy;
