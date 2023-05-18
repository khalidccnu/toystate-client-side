export const getCart = (_) => {
  let cart = {};
  const cartProducts = localStorage.getItem("cart");

  if (cartProducts) cart = JSON.parse(cartProducts);

  return cart;
};

export const addCart = (id, shortCart) => {
  const cart = getCart();

  id in cart ? (!shortCart ? cart[id]++ : null) : (cart[id] = 1);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeCart = (id, shortCart) => {
  const cart = getCart();

  !shortCart ? (cart[id] > 0 ? cart[id]-- : null) : delete cart[id];

  localStorage.setItem("cart", JSON.stringify(cart));
};
