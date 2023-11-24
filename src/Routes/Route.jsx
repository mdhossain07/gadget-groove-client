import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashbaordLayout from "../Layout/DashbaordLayout";
import Dashbaord from "../Pages/Dashboard/Dashbaord";
import UserProfile from "../Pages/Dashboard/Users/UserProfile/UserProfile";
import AddProducts from "../Pages/Dashboard/Users/AddProducts/AddProducts";
import MyProducts from "../Pages/Dashboard/Users/MyProducts/MyProducts";
import UpdateProduct from "../Pages/Dashboard/Users/UpdateProduct/UpdateProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import ProductReview from "../Pages/Dashboard/Moderator/ProductReview/ProductReview";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`/api/v1/product/${params.id}`),
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/dashboard",
    element: <DashbaordLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashbaord />,
      },
      {
        path: "/dashboard/my-profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/dashboard/product-review",
        element: <ProductReview />,
      },
    ],
  },
]);

export default routes;
