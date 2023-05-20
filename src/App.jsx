import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLoader from "./loaders/HomeLoader.js";
import ViewToyLoader from "./loaders/ViewToyLoader.js";
import CartLoader from "./loaders/CartLoader.js";
import AuthProvider from "./providers/AuthProvider.jsx";
import LogOffRoute from "./components/LogOffRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Root from "./routes/Root.jsx";
import Error from "./routes/Error.jsx";
import Home from "./routes/Home.jsx";
import AllToys from "./routes/AllToys.jsx";
import ViewToy from "./routes/ViewToy.jsx";
import Cart from "./routes/Cart.jsx";
import OrderComplete from "./routes/OrderComplete.jsx";
import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Signup from "./routes/Signup.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Root />
        </AuthProvider>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: HomeLoader,
        },
        {
          path: "/all-toys",
          element: <AllToys />,
        },
        {
          path: "/all-toys/view-toy/:id",
          element: (
            <PrivateRoute>
              <ViewToy />
            </PrivateRoute>
          ),
          loader: ({ params }) => ViewToyLoader(params.id),
        },
        {
          path: "/cart",
          element: <Cart />,
          loader: CartLoader,
        },
        {
          path: "/order-complete",
          element: <OrderComplete />,
        },
        {
          path: "/login",
          element: (
            <LogOffRoute>
              <Login />
            </LogOffRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: (
        <LogOffRoute>
          <AuthProvider>
            <Signup />
          </AuthProvider>
        </LogOffRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
