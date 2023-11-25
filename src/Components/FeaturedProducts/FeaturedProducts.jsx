import Title from "../Shared/Title";
import useProducts from "../../hooks/useProducts";
import UpVote from "../../Components/Shared/UpVote";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["featured products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/featured-products?featured=yes`
      );
      return res.data;
    },
  });

  console.log(products);
  return (
    <div>
      <Title />

      {products.map((product) => (
        <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={product.product_image} alt={product.product_name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.product_name}</h2>
            <p>{product.product_description}</p>
            <div className="card-actions justify-between gap-10">
              <UpVote />
              <button className="btn btn-neutral">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
