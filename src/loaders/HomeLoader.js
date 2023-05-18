const HomeLoader = async (_) => {
  const categories = await fetch(
    `${import.meta.env.VITE_API_LINK}/categories`
  ).then((response) => response.json());

  const discount = await fetch(
    `${import.meta.env.VITE_API_LINK}/toys/discount`
  ).then((response) => response.json());

  return [categories, discount];
};

export default HomeLoader;
