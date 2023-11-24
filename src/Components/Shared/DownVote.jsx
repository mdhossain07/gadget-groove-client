import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProducts from "../../hooks/useProducts";

const DownVote = ({ id }) => {
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
      }
      refetch();
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleDownvote} className="btn btn-secondary">
          DownVote
        </button>
      </div>
    </div>
  );
};

export default DownVote;
