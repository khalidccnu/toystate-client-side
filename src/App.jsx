import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLoader from "./loaders/HomeLoader.js";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: HomeLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
