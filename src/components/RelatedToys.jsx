import React, { useEffect, useState } from "react";
import RelatedToy from "./RelatedToy.jsx";

const RelatedToys = ({ categoryId, toyId }) => {
  const [toys, setToys] = useState([]);

  const shuffleToys = (arr) => {
    let currentIndex = arr.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  useEffect((_) => {
    fetch(`${import.meta.env.VITE_API_LINK}/toys?cid=${categoryId}`)
      .then((response) => response.json())
      .then((arr) => shuffleToys(arr))
      .then((result) => {
        const restToys = result.filter((e) => e["_id"] !== toyId);
        setToys(restToys.slice(0, 4));
      });
  }, []);

  return (
    <div className="max-w-sm sm:max-w-2xl mx-auto mt-10">
      <h3 className="font-bold text-2xl mb-5">Related Toys</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-center">
        {toys.map((toy) => (
          <RelatedToy key={toy["_id"]} toy={toy} />
        ))}
      </div>
    </div>
  );
};

export default RelatedToys;
