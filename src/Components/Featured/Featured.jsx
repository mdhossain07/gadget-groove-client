import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Featured = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const [featured, setFeatured] = useState(false);

  const handleFeatured = (id) => {
    axiosPublic.patch(`/api/v1/make-featured/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: `You make this product Featured!`,
          icon: "success",
        });
      }
    });
  };

  axiosPublic.get(`/api/v1/product/${id}`).then((res) => {
    if (res.data.featured === "yes" && res.data.status === "accepted") {
      setFeatured(true);
    }
  });

  return (
    <div>
      <button
        onClick={() => handleFeatured(id)}
        className={`btn btn-primary ${featured && "enabled"}`}
      >
        {featured ? "Featured" : "Make Featured"}
      </button>
    </div>
  );
};

export default Featured;
