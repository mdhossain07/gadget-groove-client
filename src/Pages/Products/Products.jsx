import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../../Components/Shared/ProductsCard";
import Container from "../../Components/Shared/Container";
import { useEffect, useState } from "react";

const Products = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Products";
  }, []);
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/accepted-products?status=accepted`
      );
      return res.data;
    },
  });
  const [tags, setTags] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    axiosPublic.get(`/api/v1/search-products?tags=${tags}`).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
    });
  };

  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
  }, [data]);

  return (
    <div>
      <Container>
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-1/2 mx-auto"
            // value={tags}
            onBlur={(e) => setTags(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 md:right-20 bg-[#8C52FF] p-3 md:px-5 rounded-lg text-white "
          >
            Search
          </button>
        </div>

        {isLoading ? (
          <span className="mt-20 loading loading-spinner text-info tex-2xl text-center"></span>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
            {searchResults?.map((item) => (
              <ProductsCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
