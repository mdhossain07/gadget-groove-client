import { Link } from "react-router-dom";
import UpVote from "./UpVote";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductsCard = ({ product }) => {
  const {
    product_image,
    product_name,
    product_description,
    vote,
    _id,
    user_email,
    product_tags,
  } = product;
  const tags = product_tags.join(", ");
  const [votes, setVotes] = useState(vote);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          className="h-[200px] w-full p-2 rounded-lg"
          src={product_image}
          alt={product_name}
        />
      </figure>
      <div className="card-body flex space-y-1">
        <Link to={`/product/${_id}`}>
          <h2 className="card-title">{product_name}</h2>
        </Link>
        <p className="text-gray-500">{product_description.slice(0, 50)}</p>
        <p className="text-gray-500 text-sm">tags: {tags}</p>
        <div className="flex gap-3 items-center flex-grow">
          <p className="text-gray-500 text-sm">upvotes: {votes}</p>
        </div>
        <div className="card-actions justify-start flex-grow">
          <UpVote
            id={_id}
            email={user_email}
            votes={votes}
            setVotes={setVotes}
          />
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.object,
};

export default ProductsCard;
