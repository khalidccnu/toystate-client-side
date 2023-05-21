import React, { useContext, useEffect, useState } from "react";
import useTitle from "../hooks/useTitle.js";
import { AuthContext } from "../providers/AuthProvider.jsx";

const AddToy = () => {
  useTitle("Add Your Toy");
  const { userInfo } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    shipping: "",
    quantity: "",
    discount: false,
    iurl: "",
    category: "not set yet",
  });
  const [status, setStatus] = useState("");

  const changeInput = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddToy = (e) => {
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
      iurl.value === "" ||
      category.value === "not set yet"
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

    fetch(`${import.meta.env.VITE_API_LINK}/toys`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        shipping: shipping.value,
        quantity: quantity.value,
        discount: discount.checked,
        rating: 0,
        description: description.value,
        img: iurl.value,
        seller_name: userInfo.displayName,
        seller_email: userInfo.email,
        seller_id: userInfo.uid,
        category_id: category.value,
      }),
    })
      .then((_) => {
        setStatus("Toy has been successfully added!");
        setInput({
          name: "",
          description: "",
          price: "",
          shipping: "",
          quantity: "",
          discount: false,
          iurl: "",
          category: "not set yet",
        });
      })
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
        <form
          className="form-control grid grid-cols-2 gap-5 max-w-xl mx-auto"
          onSubmit={handleAddToy}
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
              className="checkbox checkbox-sm"
              onChange={changeInput}
              checked={input.discount}
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
            name="category"
            className="select select-sm select-bordered focus:outline-0"
            onChange={changeInput}
          >
            <option
              value="not set yet"
              selected={input.category === "not set yet" ? "selected" : null}
              disabled
            >
              Category
            </option>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddToy;
