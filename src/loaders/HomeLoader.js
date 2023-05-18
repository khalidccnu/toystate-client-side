const HomeLoader = async (_) => {
  return await fetch(`${import.meta.env.VITE_API_LINK}/categories`).then(
    (response) => response.json()
  );
};

export default HomeLoader;
