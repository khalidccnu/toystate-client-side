import React from "react";
import { useNavigation } from "react-router-dom";
import { Rings } from "react-loader-spinner";

const Spinner = ({ children }) => {
  const { state } = useNavigation();

  return state === "loading" ? (
    <Rings
      width="50"
      height="50"
      color="#35bef0"
      wrapperClass="justify-center mt-5"
    />
  ) : (
    children
  );
};

export default Spinner;
