import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProducts from "../../hooks/useProducts";
import { FaRegThumbsUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UpVote = ({ id, email }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpvote = (id) => {
    const voteInfo = {
      user: user?.email,
      product_id: id,
    };

    if (user && user?.email) {
      axiosPublic.post("/api/v1/make-vote", voteInfo).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          axiosPublic.patch(`/api/v1/increase-vote/${id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Good job!",
                text: "You upvoted this product!",
                icon: "success",
              });
              refetch();
            }
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: "You alreaddy upvoted this product!",
            icon: "error",
          });
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to vote this product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => handleUpvote(id)}
        className={`btn btn-primary ${
          user?.email === email && "cursor-not-allowed"
        }`}
      >
        <FaRegThumbsUp className="text-xl" />
        UpVote
      </button>
    </div>
  );
};

UpVote.propTypes = {
  id: PropTypes.string,
  email: PropTypes.string,
};

export default UpVote;
