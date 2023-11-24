import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: "Good job!",
          text: "User is created!",
          icon: "success",
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
      <button onClick={handleGoogle} className="btn btn-neutral">
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
