import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../../Components/Shared/ProductsCard";
const Products = () => {
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/accepted-products?status=accepted`
      );
      return res.data;
    },
  });
  console.log(data);
  return (
    <div>
      <h2>All Products: {data?.length}</h2>
      {data?.map((item) => (
        <ProductsCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default Products;
