import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../Components/Shared/Container";
import gadget1 from "../../assets/images/fitbit-1620217033-removebg-preview.png";
import Title from "../../Components/Shared/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Coupns = () => {
  const axiosPublic = useAxiosPublic();
  const { data: coupons } = useQuery({
    queryKey: ["get-coupons"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/coupons");
      return res.data;
    },
  });

  console.log(coupons);
  return (
    <div className="">
      <Title heading={"Get Discount"} subHeading={"Latest Gadgtes"} />
      <Container>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
            {coupons.map((coupon) => (
              <SwiperSlide key={coupon._id}>
                <div className="hero h-[60vh] bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg">
                  <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                      src={gadget1}
                      className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                      <h1 className="text-5xl font-bold text-white">
                        Coupon: {coupon.code}
                      </h1>
                      <p className="py-6 text-white">{coupon.description}</p>
                      <button className="btn btn-primary text-white">
                        Get Coupon
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </Container>
    </div>
  );
};

export default Coupns;
