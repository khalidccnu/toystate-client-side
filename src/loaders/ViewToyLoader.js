const ViewToyLoader = async (id) => {
  return await fetch(`${import.meta.env.VITE_API_LINK}/toys?id=${id}`).then(
    (response) => response.json()
  );
};

export default ViewToyLoader;
