import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import ReviewDetails from "../../Components/ReviewDetails/ReviewDetails";
import UpVote from "../../Components/Shared/UpVote";
import DownVote from "../../Components/Shared/DownVote";

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

  return (
    <div>
      <h2>{data?.product_name}</h2>
      <p>{data?.product_description}</p>
      <img src={data?.product_image} alt="" />
      <p>tags: {data?.product_tags}</p>
      <p>Total Vote: {data?.vote}</p>
      <div className="flex gap-10">
        {/* <button className="btn btn-primary">UpVote</button> */}
        <UpVote id={id} />
        <DownVote id={id} />
        <button className="btn btn-warning">Report</button>
      </div>
      <ReviewDetails id={id} />
      <Reviews id={id} />
    </div>
  );
};

export default ProductDetails;
