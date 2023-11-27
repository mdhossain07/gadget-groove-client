import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useProducts from "../../hooks/useProducts";

const Featured = ({ id, status }) => {
  const axiosPublic = useAxiosPublic();
  const [featured, setFeatured] = useState(false);
  const [, refetch] = useProducts();

  const handleFeatured = (id) => {
    axiosPublic.patch(`/api/v1/make-featured/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: `You make this product Featured!`,
          icon: "success",
        });
        refetch();
      }
    });
  };

  axiosPublic.get(`/api/v1/product/${id}`).then((res) => {
    if (res.data.featured === "yes") {
      setFeatured(true);
    }
  });

  return (
    <div>
      {featured ? (
        <h2 className="text-blue-500 font-medium text-lg">Featured</h2>
      ) : (
        <div>
          {status === "accepted" ? (
            <button
              onClick={() => handleFeatured(id)}
              className={`btn btn-primary`}
            >
              Make Featured
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

Featured.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
};

export default Featured;
