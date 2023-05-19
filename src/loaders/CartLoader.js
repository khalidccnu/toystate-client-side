import { getCart } from "../utils/index.js";

const CartLoader = async (_) => {
  const cart = [];
  const cartToys = getCart();
  const toys = await fetch(`${import.meta.env.VITE_API_LINK}/toys`).then(
    (response) => response.json()
  );

  for (let toyId in cartToys) {
    const cartToy = toys.find((toy) => toy["_id"] === toyId);
    cart.push({ ...cartToy, quantity: cartToys[toyId] });
  }

  return cart;
};

export default CartLoader;
