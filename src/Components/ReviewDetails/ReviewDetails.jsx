import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Shared/Title";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

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
    <>
      <div className="mt-20 ">
        <Title heading={"Users Review"}></Title>
        {reviews.length === 0 ? (
          <h2 className="text-center text-lg">No Reviews Yet</h2>
        ) : (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {reviews.map((item, index) => (
              <SwiperSlide item={item} key={index}>
                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[340px] mt-5">
                  <div className="flex items-center">
                    <div className="bg-white shadow-md rounded-md mt-10 relative p-16 w-9/12 space-y-2 mx-auto">
                      <h2 className="text-black text-xl font-medium">
                        {item?.user_name}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Rating: {item?.rating}
                      </p>
                      <div>
                        <img
                          className="w-20 h-20 rounded-full border-4  absolute -left-10 top-12"
                          src={item?.user_image}
                          alt={item?.user_name}
                        />
                      </div>
                      <p className="text-slate-600 text-md"> {item?.review} </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

ReviewDetails.propTypes = {
  id: PropTypes.string,
};

export default ReviewDetails;
