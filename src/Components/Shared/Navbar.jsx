import { Link, NavLink } from "react-router-dom";
import Container from "../Shared/Container";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navItems = (
    <div className="flex flex-col md:flex-row gap-3 ">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? " text-[#8C52FF] font-semibold underline"
            : "text-black font-semibold"
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? " text-[#8C52FF] font-semibold underline"
            : "text-black font-semibold"
        }
        to="/products"
      >
        Products
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? " text-[#8C52FF] font-semibold underline"
            : "text-black font-semibold"
        }
        to="/contact"
      >
        Contact Us
      </NavLink>
    </div>
  );

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        title: "Done!",
        text: "User Logged Out!",
        icon: "success",
      });
    });
  };
  return (
    <Container>
      <div className="">
        <div className="navbar bg-base-200`">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-xl font-semibold">
              <img className="w-[100px]" src="/gadget groove.png" alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt={user?.displayName} src={user?.photoURL} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard" className="text-black font-medium">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black font-medium"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
