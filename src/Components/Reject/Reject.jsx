import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";

const Reject = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [rejected, setRejected] = useState(false);
  const [, refetch] = useProducts();

  const handleReject = () => {
    axiosSecure.patch(`/api/v1/reject/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: "You rejected this request!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  axiosPublic.get(`/api/v1/product/${id}`).then((res) => {
    if (res.data.status === "rejected") {
      setRejected(true);
    }
  });

  return (
    <div>
      <button onClick={handleReject} className="btn btn-accent">
        {rejected ? "Rejected" : "Reject"}
      </button>
    </div>
  );
};

export default Reject;
