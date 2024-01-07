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
import Products from "../Pages/Products/Products";
import ReportedContents from "../Pages/Dashboard/Moderator/ReportedContents/ReportedContents";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUser/ManageUsers";
import AdminRoute from "./AdminRoute";
import Contact from "../Pages/Contact/Contact";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons/ManageCoupons";
import Statistics from "../Pages/Dashboard/Admin/Statistics/Statistics";
import AddCoupons from "../Pages/Dashboard/Admin/AddCoupons/AddCoupons";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
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

      {
        path: "/contact",
        element: <Contact />,
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
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
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
      {
        path: "/dashboard/reported-contents",
        element: <ReportedContents />,
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-coupons",
        element: (
          <AdminRoute>
            <AddCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;
