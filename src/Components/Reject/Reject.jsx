import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import PropTypes from "prop-types";

const Reject = ({ id, status }) => {
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
      {rejected ? (
        <h2 className="text-xl font-medium text-red-500">Rejected</h2>
      ) : (
        <div>
          {status === "accepted" ? null : (
            <button onClick={handleReject} className="btn btn-error">
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Reject.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
};

export default Reject;
