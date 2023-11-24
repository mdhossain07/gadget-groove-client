import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import ReviewDetails from "../../Components/Reviews/ReviewDetails/ReviewDetails";

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
      <h2>Hello</h2>
      <h2>{data?.product_name}</h2>
      <p>{data?.product_description}</p>
      <img src={data?.product_image} alt="" />
      <p>tags: {data?.product_tags}</p>
      <p>Total Vote: {data?.vote}</p>
      <div className="flex gap-10">
        <button className="btn btn-primary">UpVote</button>
        <button className="btn btn-warning">Report</button>
      </div>
      <ReviewDetails />
      <Reviews />
    </div>
  );
};

export default ProductDetails;
