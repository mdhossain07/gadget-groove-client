import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Register";
  }, []);
  const { createUser, updateUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((res) => {
      updateUser(data.name)
        .then(() => {
          axiosPublic.post("/users", data).then((res) => {
            Swal.fire({
              title: "Good job!",
              text: "User is created!",
              icon: "success",
            });
            console.log(res.data);
          });

          console.log(res.user);
          navigate("/");
        })
        .catch((err) => {
          Swal.fire("Error!", err.message, "error");
        });
    });
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full">
      <div className="bg-[#07332F] md:flex-1 min-h-screen">
        <img
          className="w-[400px] mx-auto text-center mt-32"
          src={image}
          alt=""
        />
      </div>
      <div className="md:flex-1 hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Sign up to Doc House</h1>
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="bg-[#F7A582] hover:bg-orange-400 p-3 text-white rounded-lg">
                  Create Account
                </button>
              </div>
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
    </div>
  );
};

export default Register;
