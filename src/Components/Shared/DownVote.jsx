import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProducts from "../../hooks/useProducts";
import { FaRegThumbsDown } from "react-icons/fa";
import PropTypes from "prop-types";

const DownVote = ({ id, downVotes, setDownVotes }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useProducts();

  const handleDownvote = () => {
    axiosPublic.patch(`/api/v1/decrease-vote/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: "You downvoted this product!",
          icon: "success",
        });
        refetch();
        setDownVotes(downVotes + 1);
      }
    });
  };
  return (
    <div>
      <div>
        <button
          onClick={handleDownvote}
          className="btn bg-[#8C52FF] p-3 rounded-lg text-white"
        >
          <FaRegThumbsDown className="text-xl" />
          DownVote
        </button>
      </div>
    </div>
  );
};

DownVote.propTypes = {
  id: PropTypes.string,
  downVotes: PropTypes.number,
  setDownVotes: PropTypes.func,
};

export default DownVote;
