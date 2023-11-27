import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useProducts from "../../hooks/useProducts";
import PropTypes from "prop-types";

const Accept = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useProducts();
  const [status, setStatus] = useState(false);

  const handleStatus = (id) => {
    axiosPublic.patch(`/api/v1/update-status/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: "You accepted this request!",
          icon: "success",
        });
        refetch();
      }
      console.log(res.data);
    });
  };

  axiosPublic.get(`/api/v1/product/${id}`).then((res) => {
    if (res.data.status === "accepted") {
      setStatus(true);
    }
  });
  return (
    <div>
      <button
        onClick={() => handleStatus(id)}
        className={`btn btn-warning ${
          status ? "cursor-not-allowed disabled:" : "enabled:"
        }`}
      >
        {status ? "Accepted" : "Accept"}
      </button>
    </div>
  );
};

Accept.propTypes = {
  id: PropTypes.string,
};

export default Accept;
