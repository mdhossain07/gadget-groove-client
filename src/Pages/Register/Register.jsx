import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/Shared/SocialLogin";

const Register = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Register";
  }, []);
  const { createUser, updateUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUser(data.name, data.image)
          .then(() => {
            const userInfo = {
              name: data?.name,
              email: data?.email,
              image: data?.image,
            };
            axiosPublic.post("/api/v1/add-user", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Good job!",
                  text: "User is created!",
                  icon: "success",
                });
              }
            });
            navigate("/");
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      });
  };

  return (
    <div className="md:flex-1 hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Sign up to Gadget Groove </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                {...register("image")}
                type="text"
                placeholder="image url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="bg-[#8C52FF] hover:bg-[#FF66C4] p-3 text-white rounded-lg">
                Create Account
              </button>
            </div>

            <SocialLogin />
            <p>
              Already has an account?{" "}
              <Link className="text-green-600 font-medium" to="/login">
                Sign in Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
