import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const ReviewDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/reviews?sid=${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>Review Section: {reviews.length}</h2>
      {reviews.map((item, index) => (
        <p key={index}>{item.review}</p>
      ))}
    </div>
  );
};

export default ReviewDetails;
