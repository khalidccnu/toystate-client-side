import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../hooks/useTitle.js";
import CartToy from "../components/CartToy.jsx";
import CartCalc from "../components/CartCalc.jsx";

const Cart = () => {
  useTitle("Cart");
  const cartLoader = useLoaderData();
  const [cart, setCart] = useState(cartLoader);
  const [cartAction, setCartAction] = useState("");

  useEffect(
    (_) => {
      const action = cartAction.split(" ");

      switch (action[1]) {
        case "inc":
          const incCart = [];

          cart.forEach((toy) => {
            let incToy;

            toy["_id"] === action[0]
              ? (incToy = {
                  ...toy,
                  quantity: toy.quantity + 1,
                })
              : (incToy = toy);

            incCart.push(incToy);
          });

          setCart(incCart);
          setCartAction("");
          break;

        case "dec":
          const decCart = [];

          cart.forEach((toy) => {
            let decToy;

            toy["_id"] === action[0]
              ? (decToy = {
                  ...toy,
                  quantity: toy.quantity - 1,
                })
              : (decToy = toy);

            decCart.push(decToy);
          });

          setCart(decCart);
          setCartAction("");
          break;

        case "rem":
          const remCart = cart.filter((toy) => toy["_id"] !== action[0]);

          setCart(remCart);
          setCartAction("");
          break;

        case "empty":
          setCart([]);
      }
    },
    [cartAction]
  );

  return (
    <section className="py-10">
      <div className="container">
        {cart.length ? (
          <div
            className={`flex flex-col ${
              cart.length === 1
                ? "sm:flex-row sm:items-start sm:max-w-2xl"
                : "md:flex-row sm:items-center md:items-start sm:max-w-lg md:max-w-2xl"
            } max-w-sm lg:max-w-5xl mx-auto`}
          >
            <div
              className={`lg:w-full mb-10 ${
                cart.length === 1 ? "sm:mb-0 sm:mr-14" : "md:mb-0 md:mr-14"
              } lg:mr-24`}
            >
              <div
                className={`grid grid-cols-1 ${
                  cart.length === 1 ? "" : "sm:grid-cols-2 md:grid-cols-1"
                } gap-5`}
              >
                {cart.map((toy) => (
                  <CartToy
                    key={toy["_id"]}
                    setCartAction={setCartAction}
                    toy={toy}
                  />
                ))}
              </div>
            </div>
            <div className="sm:min-w-[20rem]">
              <CartCalc setCartAction={setCartAction} cart={cart} />
            </div>
            <div></div>
          </div>
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
              <span>Your cart is currently empty.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
