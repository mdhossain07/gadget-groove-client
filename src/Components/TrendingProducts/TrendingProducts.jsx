import { useQuery } from "@tanstack/react-query";
import Title from "../Shared/Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../Shared/ProductsCard";
import { Link } from "react-router-dom";

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
      <Title subHeading={"latest gadgets"} heading={"Trending Products"} />

      {isPending ? (
        <span className="mt-20 loading loading-spinner text-info text-2xl text-center"></span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5">
          {products.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}

          <Link to="/products">
            <button className="btn btn-neutral my-10 ">All Products </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
