import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
        };
        axiosPublic.post("/api/v1/add-user", userInfo).then(() => {
          Swal.fire({
            title: "Good job!",
            text: "User is created!",
            icon: "success",
          });
          navigate("/");
        });
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
    <div>
      <br />
      <h2 className="text-center font-medium ">
        ------ Or Sign in with-------
      </h2>

      <button onClick={handleGoogle} className="mt-5 btn btn-neutral w-full">
        Google <FaGoogle />
      </button>
    </div>
  );
};

export default SocialLogin;
