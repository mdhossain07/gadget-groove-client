import Title from "../Shared/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../Shared/ProductsCard";
import Container from "../Shared/Container";

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isPending } = useQuery({
    queryKey: ["featured products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/featured-products?featured=yes`
      );
      return res.data;
    },
  });

  return (
    <div>
      <Container>
        <Title subHeading={"Latest gadgets"} heading={"Featured Products"} />
        {isPending ? (
          <span className="mt-20 loading loading-spinner text-info text-2xl text-center"></span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {products?.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FeaturedProducts;
