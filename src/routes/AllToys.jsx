import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import AllToy from "../components/AllToy.jsx";

const AllToys = () => {
  const [isLoading, setLoading] = useState(true);
  const [toys, setToys] = useState([]);
  const [displayToy, setDisplayToy] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(
    (_) => {
      (async (_) => {
        const toysArr = [];

        const toysData = await fetch(
          `${
            import.meta.env.VITE_API_LINK
          }/toys?search=${searchKeyword}&limit=${displayToy || 20}&sort=${sort}`
        ).then((response) => response.json());

        const categories = await fetch(
          `${import.meta.env.VITE_API_LINK}/categories`
        ).then((response) => response.json());

        toysData.forEach((toy) => {
          const category = categories.find(
            (cat) => toy["category_id"] === cat["_id"]
          );

          toysArr.push({ ...toy, category_name: category.name });
        });

        setToys(toysArr);
        setLoading(false);
      })();
    },
    [searchKeyword, displayToy, sort]
  );

  return isLoading ? (
    <Rings
      width="50"
      height="50"
      color="#35bef0"
      wrapperClass="justify-center mt-5"
    />
  ) : (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 sm:justify-between mb-5">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="input input-sm input-bordered"
          />
          <input
            type="text"
            placeholder="20 Toy Display"
            value={displayToy}
            onChange={(e) => setDisplayToy(e.target.value)}
            className="input input-sm input-bordered sm:text-end"
          />
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>
                  <span className="inline-flex gap-x-1">
                    <span>Price</span>
                    {sort === "asc" ? (
                      <FaSortNumericDown
                        className="hover:text-pink-600 cursor-pointer"
                        onClick={(_) => setSort("des")}
                      />
                    ) : (
                      <FaSortNumericUp
                        className="hover:text-pink-600 cursor-pointer"
                        onClick={(_) => setSort("asc")}
                      />
                    )}
                  </span>
                </th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {toys.map((toy, idx) => (
                <AllToy key={toy["_id"]} idx={idx} toy={toy} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllToys;
