import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashbaordLayout from "../Layout/DashbaordLayout";
import Dashbaord from "../Pages/Dashboard/Dashbaord";
import UserProfile from "../Pages/Dashboard/Users/UserProfile/UserProfile";
import AddProducts from "../Pages/Dashboard/Users/AddProducts/AddProducts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/dashboard/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProducts />,
      },
    ],
  },
]);

export default routes;
