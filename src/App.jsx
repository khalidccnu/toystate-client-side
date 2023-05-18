import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLoader from "./loaders/HomeLoader.js";
import AuthProvider from "./providers/AuthProvider.jsx";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";

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
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/signup",
      element: (
        <AuthProvider>
          <Signup />
        </AuthProvider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
