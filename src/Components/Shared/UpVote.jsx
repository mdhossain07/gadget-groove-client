import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProducts from "../../hooks/useProducts";

const UpVote = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useProducts();

  const handleUpvote = () => {
    axiosPublic.patch(`/api/v1/increase-vote/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "You upvoted this product!",
          icon: "success",
        });
      }
      refetch();
    });
  };
  return (
    <div>
      <button onClick={handleUpvote} className="btn btn-primary">
        UpVote
      </button>
    </div>
  );
};

export default UpVote;
