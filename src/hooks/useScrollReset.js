import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(
    (_) => {
      scroll(0, 0);
    },
    [pathname]
  );
};

export default UseScrollReset;
