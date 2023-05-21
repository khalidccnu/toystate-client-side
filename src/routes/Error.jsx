import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import { FaHome } from "react-icons/fa";
import useTitle from "../hooks/useTitle.js";
import anmPageNotFound from "../assets/page-not-found.json";

const Error = () => {
  useTitle("Page Not Found");
  const { status, statusText } = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="py-5">
      <div className="container">
        <div className="card max-w-xs mx-auto">
          <figure>
            <Lottie animationData={anmPageNotFound} loop={true} />
          </figure>
          <div className="card-body -mt-14 text-center">
            <h2 className="card-title justify-center">Oops!</h2>
            <span className="font-semibold">
              {status && statusText ? status + " " + statusText : null}
            </span>
            <span className="text-gray-500">An error has occurred!</span>
            <div className="card-actions justify-center">
              <button
                type="button"
                className="btn btn-xs px-5 bg-[#35bef0] border-none rounded normal-case"
                onClick={(_) => navigate("/")}
              >
                <FaHome />
                <span className="mt-1 ml-1">Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
