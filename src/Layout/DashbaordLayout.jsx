import { Link, Outlet } from "react-router-dom";

const DashbaordLayout = () => {
  const dashboardMenu = (
    <div className="flex flex-col space-y-3 p-5">
      <Link
        className="text-white font-semibold text-xl"
        to="/dashboard/user-profile"
      >
        {" "}
        My Profile{" "}
      </Link>
      <Link
        className="text-white font-semibold text-xl"
        to="/dashboard/add-products"
      >
        {" "}
        Add Products{" "}
      </Link>
      <Link
        className="text-white font-semibold text-xl"
        to="/dashboard/user-home"
      >
        {" "}
        My Products{" "}
      </Link>
      <hr />
      {/* Shared Nav */}
      <Link className="text-white font-semibold text-xl" to="/">
        {" "}
        Home{" "}
      </Link>
    </div>
  );
  return (
    <div className="flex min-h-screen">
      <div className="bg-blue-400 w-1/4">{dashboardMenu}</div>
      <div className="bg-base-200 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashbaordLayout;
