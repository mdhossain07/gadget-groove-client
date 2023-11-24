import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/products");
      return res.data;
    },
  });
  return [products];
};

export default useProducts;
