import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import ReviewDetails from "../../Components/ReviewDetails/ReviewDetails";
import UpVote from "../../Components/Shared/UpVote";
import DownVote from "../../Components/Shared/DownVote";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/product/${id}`);
      return res.data;
    },
  });

  const handleReport = () => {
    const productInfo = {
      product_id: id,
      product_name: data?.product_name,
      product_image: data?.product_image,
    };
    axiosPublic.post(`/api/v1/make-report`, productInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "You reported this product!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <h2>{data?.product_name}</h2>
      <p>{data?.product_description}</p>
      <img src={data?.product_image} alt="" />
      <p>tags: {data?.product_tags}</p>
      <p>Total Vote: {data?.vote}</p>
      <p>status: {data?.status}</p>
      <div className="flex gap-10">
        {/* <button className="btn btn-primary">UpVote</button> */}
        <UpVote id={id} />
        <DownVote id={id} />
        <button onClick={() => handleReport(id)} className="btn btn-warning">
          Report
        </button>
      </div>
      <ReviewDetails id={id} />
      <Reviews id={id} />
    </div>
  );
};

export default ProductDetails;
