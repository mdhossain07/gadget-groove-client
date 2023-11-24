import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/Shared/SocialLogin";

const Login = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Login";
  }, []);

  const { register, handleSubmit } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "User Logged in",
          icon: "success",
        });
        console.log(res.user);
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed",
          text: `${err.message}`,
          icon: "error",
        });
      });
  };
  return (
    <div className="md:flex-1 hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Sign in to Gadget Groove</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="bg-[#8C52FF] hover:bg-[#FF66C4] p-3 text-white rounded-lg">
                Login Now
              </button>
            </div>

            <SocialLogin />
            <p>
              New to this website?{" "}
              <Link className="text-green-600 font-medium" to="/register">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
