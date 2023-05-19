import React, { useContext, useEffect } from "react";
import useTitle from "../hooks/useTitle.js";
import { AuthContext } from "../providers/AuthProvider.jsx";

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);
  useTitle(userInfo.displayName || "Dashboard");

  useEffect((_) => {
    sessionStorage.setItem("_vu", JSON.stringify(true));
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col items-center">
          <h5 className="font-semibold">Hello,</h5>
          <h3 className="font-bold text-2xl">
            {userInfo.displayName || "Anonymous"}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
