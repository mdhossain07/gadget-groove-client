import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/products");
      return res.data;
    },
  });
  return [products, refetch];
};

export default useProducts;
