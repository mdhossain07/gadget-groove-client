import { useQuery } from "@tanstack/react-query";
import Title from "../Shared/Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../Shared/ProductsCard";
import { Link } from "react-router-dom";
import Container from "../Shared/Container";

const TrendingProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isPending } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/trending-products`);
      return res.data;
    },
  });

  return (
    <div>
      <Container>
        <Title subHeading={"Latest gadgets"} heading={"Trending Products"} />

        {isPending ? (
          <span className="mt-20 loading loading-spinner text-info text-2xl text-center"></span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
            {products.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="w-1/2 mx-auto">
          <Link className="flex justify-center" to="/products">
            <button className=" p-3 rounded-lg font-medium bg-[#8C52FF] text-white my-10 mx-auto">
              Show All Products
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TrendingProducts;
