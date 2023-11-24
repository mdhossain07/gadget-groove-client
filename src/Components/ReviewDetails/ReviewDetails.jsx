import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ReviewDetails = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/reviews?sid=${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-medium mt-10">Review Section: </h2>
      {reviews.map((item, index) => (
        <p key={index}>{item.review}</p>
      ))}
    </div>
  );
};

export default ReviewDetails;
