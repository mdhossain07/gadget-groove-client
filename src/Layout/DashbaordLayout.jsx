import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import {
  FaChartPie,
  FaFileExcel,
  FaHome,
  FaHouseUser,
  FaPlusSquare,
  FaShopify,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";

const DashbaordLayout = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();

  const dashboardMenu = (
    <div>
      <img className="w-[200px]" src="/gadget groove.png" alt="" />
      {isAdmin && (
        <div className="flex flex-col space-y-3 p-5">
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/manage-users"
          >
            <div className="flex items-center gap-3">
              <FaUsers />
              Manage Users
            </div>
          </Link>
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/statistics"
          >
            <div className="flex items-center gap-3">
              <FaChartPie />
              Statistics
            </div>
          </Link>
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/manage-coupons"
          >
            <div className="flex items-center gap-3">
              <FaTicketAlt />
              Statistics
            </div>
          </Link>

          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/product-review"
          >
            <div className="flex items-center gap-3">
              <FaShopify />
              Product Review
            </div>
          </Link>

          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/reported-contents"
          >
            <div className="flex items-center gap-3">
              <FaFileExcel />
              Reported Contents
            </div>
          </Link>
        </div>
      )}

      {isModerator ? (
        <div className="flex flex-col space-y-3 p-5">
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/product-review"
          >
            <div className="flex items-center gap-3">
              <FaShopify />
              Product Review
            </div>
          </Link>

          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/reported-contents"
          >
            <div className="flex items-center gap-3">
              <FaFileExcel />
              Reported Contents
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={`flex flex-col space-y-3 p-5 ${
            isAdmin ? "hidden" : "block"
          }`}
        >
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/my-profile"
          >
            <div className="flex items-center gap-3">
              <FaHouseUser />
              My Profile
            </div>
          </Link>
          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/add-products"
          >
            <div className="flex items-center gap-3">
              <FaPlusSquare />
              Add Products
            </div>
          </Link>

          <Link
            className="text-white font-semibold text-lg"
            to="/dashboard/my-products"
          >
            <div className="flex items-center gap-3">
              <FaShopify />
              My Products
            </div>
          </Link>
        </div>
      )}

      <hr />

      {/* Shared Nav */}
      <Link className="text-white font-semibold text-lg p-5" to="/">
        <div className="flex gap-3 items-center p-5">
          <FaHome />
          Home
        </div>
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
