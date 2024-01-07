import { Link } from "react-router-dom";
import error from "../../assets/images/404 Error.webp";

const ErrorPage = () => {
  return (
    <div className="mt-20 md:w-9/12 mx-auto">
      <img className="h-[60vh] w-full" src={error} alt="" />
      <di className="flex justify-center mt-20">
        <Link to="/">
          <button className="btn btn-info text-white text-center">
            Back to Home
          </button>
        </Link>
      </di>
    </div>
  );
};

export default ErrorPage;
