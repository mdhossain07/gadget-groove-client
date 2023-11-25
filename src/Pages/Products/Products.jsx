import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "../../Components/Shared/ProductsCard";
import Container from "../../Components/Shared/Container";
import { useState } from "react";

const Products = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/accepted-products?status=accepted`
      );
      return res.data;
    },
  });

  console.log(data);

  const [tags, setTags] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = () => {
    axiosPublic.get(`/api/v1/search-products?tags=${tags}`).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
    });
  };
  console.log(searchResults);

  return (
    <div>
      <Container>
        <h2 className="text-2xl font-medium">All Products: {data?.length}</h2>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-1/2 mx-auto"
            // value={tags}
            onBlur={(e) => setTags(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-neutral w-1/2 mx-auto mt-5"
          >
            Search
          </button>
        </div>

        {isPending ? (
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
