import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Reviews from "../../Components/Reviews/Reviews";
import ReviewDetails from "../../Components/ReviewDetails/ReviewDetails";
import UpVote from "../../Components/Shared/UpVote";
import DownVote from "../../Components/Shared/DownVote";
import Swal from "sweetalert2";
import Container from "../../Components/Shared/Container";
import { useEffect, useState } from "react";
import Title from "../../Components/Shared/Title";

const ProductDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/product/${id}`);
      return res.data;
    },
  });

  const handleReport = () => {
    const productInfo = {
      product_id: id,
      product_name: data?.product_name,
      product_image: data?.product_image,
    };
    axiosPublic.post(`/api/v1/make-report`, productInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "You reported this product!",
          icon: "success",
        });
      }
    });
  };

  const tags = data?.product_tags.join(", ");
  const [votes, setVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);

  useEffect(() => {
    if (data) {
      setVotes(data?.vote);
    }
  }, [data]);

  useEffect(() => {
    if (data?.downVote) {
      setDownVotes(data?.downVote);
    }
  }, [data]);

  return (
    <div className="mt-10">
      <Title heading={"Product Details"} subHeading={"Latest Gadgets"} />
      <Container>
        <div className="flex flex-col md:flex-row gap-10 md:items-center">
          <img className="rounded-lg" src={data?.product_image} alt="" />
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">{data?.product_name}</h2>
            <p className="text-gray-500">{data?.product_description}</p>
            <p className="text-gray-500">tags: {tags}</p>
            <p className="text-gray-500">Total Upvotes: {votes}</p>
            <p className="text-gray-500">Total Downvotes: {downVotes}</p>
            <p className="text-gray-500">status: {data?.status}</p>
            <div className="flex gap-10">
              <UpVote id={id} votes={votes} setVotes={setVotes} />
              <DownVote
                id={id}
                downVotes={downVotes}
                setDownVotes={setDownVotes}
              />
              <button
                onClick={() => handleReport(id)}
                className="btn btn-warning"
              >
                Report
              </button>
            </div>
          </div>
        </div>

        <ReviewDetails id={id} />
        <Reviews id={id} />
      </Container>
    </div>
  );
};

export default ProductDetails;
