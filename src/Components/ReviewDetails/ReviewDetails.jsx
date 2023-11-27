import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReviewCard from "../ReviewCard/ReviewCard";
import Title from "../Shared/Title";
import PropTypes from "prop-types";

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
    <div className="mt-20">
      <Title heading={"Users Review"}></Title>
      {reviews.length === 0 ? (
        <h2 className="text-center text-lg">No Reviews Yet</h2>
      ) : (
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[340px] mt-20">
          {reviews.map((item, index) => (
            <ReviewCard item={item} key={index}>
              {item.review}
            </ReviewCard>
          ))}
        </div>
      )}
    </div>
  );
};

ReviewDetails.propTypes = {
  id: PropTypes.string,
};

export default ReviewDetails;
