import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";
import { AuthContext } from "../providers/AuthProvider.jsx";

const UpdateToy = () => {
  useTitle("Update Your Toy");
  const { userInfo } = useContext(AuthContext);
  const toy = useLoaderData();
  const {
    _id: id,
    category_id,
    seller_id,
    name,
    price,
    shipping,
    quantity,
    discount,
    description,
    img,
  } = toy;
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    name: name,
    description: description,
    price: price,
    shipping: shipping,
    quantity: quantity,
    iurl: img,
  });
  const [inputCheckBox, setInputCheckBox] = useState(discount);
  const [inputSelect, setInputSelect] = useState("");
  const [status, setStatus] = useState("");

  const changeInput = ({ target }) => {
    const { name, value } = target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdateToy = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      price,
      shipping,
      quantity,
      discount,
      iurl,
      category,
    } = e.target;

    if (
      name.value === "" ||
      description.value === "" ||
      price.value === "" ||
      shipping.value === "" ||
      quantity.value === "" ||
      iurl.value === ""
    ) {
      setStatus("All fields are required!");
      return false;
    } else if (
      isNaN(price.value) ||
      isNaN(shipping.value) ||
      isNaN(quantity.value)
    ) {
      setStatus("Field should be number!");
      return false;
    }

    fetch(`${import.meta.env.VITE_API_LINK}/toys?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        shipping: shipping.value,
        quantity: quantity.value,
        discount: discount.value,
        rating: 0,
        description: description.value,
        img: iurl.value,
        seller_name: userInfo.displayName,
        seller_email: userInfo.email,
        seller_id: userInfo.uid,
        category_id: category.value,
      }),
    })
      .then((_) => setStatus("Toy has been successfully updated!"))
      .catch((_) => setStatus("Something went wrong!"));
  };

  useEffect((_) => {
    fetch(`${import.meta.env.VITE_API_LINK}/categories`)
      .then((response) => response.json())
      .then((result) => setCategories(result));
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        {seller_id === userInfo?.uid ? (
          <form
            className="form-control grid grid-cols-2 gap-5 max-w-xl mx-auto"
            onSubmit={handleUpdateToy}
          >
            {status ? (
              <span className="col-span-full text-xs font-medium text-[#35bef0]">
                {status}
              </span>
            ) : null}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              className="col-span-full input input-sm input-bordered focus:outline-0"
              onChange={changeInput}
            />
            <textarea
              rows="5"
              placeholder="Write Something About Your Toy"
              name="description"
              value={input.description}
              className="col-span-full textarea textarea-sm textarea-bordered focus:outline-0 resize-none"
              onChange={changeInput}
            ></textarea>
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={input.price}
              className="input input-sm input-bordered focus:outline-0"
              onChange={changeInput}
            />
            <input
              type="text"
              placeholder="Shipping Cost"
              name="shipping"
              value={input.shipping}
              className="input input-sm input-bordered focus:outline-0"
              onChange={changeInput}
            />
            <input
              type="text"
              placeholder="Quantity"
              name="quantity"
              value={input.quantity}
              className="input input-sm input-bordered focus:outline-0"
              onChange={changeInput}
            />
            <label className="label w-fit p-0 gap-x-1 cursor-pointer">
              <span className="label-text">Discount</span>
              <input
                type="checkbox"
                name="discount"
                value={inputCheckBox}
                className="checkbox checkbox-sm"
                onChange={(_) => setInputCheckBox(!inputCheckBox)}
                checked={inputCheckBox ? "checked" : null}
              />
            </label>
            <input
              type="text"
              placeholder="Image URL"
              name="iurl"
              value={input.iurl}
              className="input input-sm input-bordered focus:outline-0"
              onChange={changeInput}
            />
            <select
              className="select select-sm select-bordered focus:outline-0"
              name="category"
              value={inputSelect}
              onChange={(e) => setInputSelect(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category["_id"]} value={category["_id"]}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="col-span-full text-center">
              <button
                type="submit"
                className="btn btn-sm min-w-[15rem] bg-[#35bef0] border-none rounded-lg normal-case"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <div className="alert max-w-xl mx-auto">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Permission Denied. You are not seller for this toy.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateToy;
