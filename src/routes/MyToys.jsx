import React, { useContext, useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import useTitle from "../hooks/useTitle.js";
import { AuthContext } from "../providers/AuthProvider.jsx";
import MyToy from "../components/MyToy.jsx";

const MyToys = () => {
  useTitle("My  Toys");
  const [isLoading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const [toys, setToys] = useState([]);
  const [displayToy, setDisplayToy] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState("asc");
  const [action, setAction] = useState(false);

  useEffect(
    (_) => {
      (async (_) => {
        if (!/^[a-zA-Z]+$/.test(searchKeyword) && searchKeyword !== "") {
          toast.warn("Only letter supported!");
          return false;
        }

        const toysArr = [];

        const toysData = await fetch(
          `${import.meta.env.VITE_API_LINK}/toys?uid=${
            userInfo.uid
          }&search=${searchKeyword}&limit=${displayToy || 20}&sort=${sort}`
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
    [searchKeyword, displayToy, sort, action]
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
        {toys.length ? (
          <div>
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
                    <th>Shipping</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {toys.map((toy, idx) => (
                    <MyToy
                      key={toy["_id"]}
                      action={action}
                      setAction={setAction}
                      idx={idx}
                      toy={toy}
                    />
                  ))}
                </tbody>
              </table>
            </div>
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
              <span>You did not add any toy yet.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyToys;
