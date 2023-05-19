import React, { useEffect } from "react";

const UseTitle = (title) => {
  useEffect(
    (_) => {
      document.title = `ToyState | ${title}`;
    },
    [title]
  );
};

export default UseTitle;
