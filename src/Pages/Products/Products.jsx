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
  const [page, setPage] = useState(0);

  const {
    data: { result, postCount },
    isLoading,
  } = useQuery({
    queryKey: ["products", page],
    initialData: { result: [], postCount: 0 },
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/accepted-products?status=accepted&page=${page}`
      );
      return res.data;
    },
  });
  const [tags, setTags] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const totalPages = Math.ceil(postCount / 10);
  const pages = [...new Array(totalPages).fill(0)];
  console.log(pages);

  const handleSearch = () => {
    axiosPublic.get(`/api/v1/search-products?tags=${tags}`).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
    });
  };

  useEffect(() => {
    if (result) {
      setSearchResults(result);
    }
  }, [result]);

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
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
            {searchResults?.map((item) => (
              <ProductsCard key={item._id} product={item} />
            ))}
          </div>
        )}

        <div className="my-10 flex justify-center">
          {pages.map((item, index) => (
            <button
              className={`w-10 h-10 ${
                page === index ? "bg-[#8C52FF] text-white " : "text-black"
              } rounded-full mr-3`}
              key={index}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;
