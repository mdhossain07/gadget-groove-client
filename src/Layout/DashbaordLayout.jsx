import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const DashbaordLayout = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();

  const dashboardMenu = (
    <div>
      <img className="w-[200px]" src="/gadget groove.png" alt="" />
      {isAdmin && (
        <div className="flex flex-col space-y-3 p-5">
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/manage-users"
          >
            Manage Users
          </Link>
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/statistics"
          >
            Statistics
          </Link>
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/manage-coupons"
          >
            Manage Coupons
          </Link>

          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/product-review"
          >
            Product Review
          </Link>

          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/reported-contents"
          >
            Reported Contents
          </Link>
        </div>
      )}

      {isModerator ? (
        <div className="flex flex-col space-y-3 p-5">
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/product-review"
          >
            Product Review
          </Link>

          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/reported-contents"
          >
            Reported Contents
          </Link>
        </div>
      ) : (
        <div
          className={`flex flex-col space-y-3 p-5 ${
            isAdmin ? "hidden" : "block"
          }`}
        >
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/my-profile"
          >
            My Profile
          </Link>
          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/add-products"
          >
            Add Products
          </Link>

          <Link
            className="text-white font-semibold text-xl"
            to="/dashboard/my-products"
          >
            My Products
          </Link>
        </div>
      )}

      <hr />

      {/* Shared Nav */}
      <Link className="text-white font-semibold text-xl p-5" to="/">
        Home
      </Link>
    </div>
  );
  return (
    <div className="flex min-h-screen">
      <div className="bg-blue-400 w-1/3 md:w-1/6">{dashboardMenu}</div>
      <div className="bg-base-200 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashbaordLayout;
