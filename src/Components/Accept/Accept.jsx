import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useProducts from "../../hooks/useProducts";
import PropTypes from "prop-types";

const Accept = ({ id, status }) => {
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useProducts();
  const [accept, setAccept] = useState(false);

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
      setAccept(true);
    }
  });
  return (
    <div>
      {accept ? (
        <h2 className="text-lg font-medium text-green-500">Aceepted</h2>
      ) : (
        <div>
          {status === "rejected" ? null : (
            <button
              onClick={() => handleStatus(id)}
              className={`btn btn-accent `}
            >
              Accept
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Accept.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
};

export default Accept;
