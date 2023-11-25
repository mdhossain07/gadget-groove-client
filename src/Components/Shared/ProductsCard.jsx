import { Link } from "react-router-dom";
import UpVote from "./UpVote";
import PropTypes from "prop-types";

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

  return (
    <div className="card w-9/12 mx-auto bg-base-100 shadow-xl">
      <figure>
        <img
          className="h-[200px] p-2 rounded-lg"
          src={product_image}
          alt={product_name}
        />
      </figure>
      <div className="card-body flex">
        <Link to={`/product/${_id}`}>
          <h2 className="card-title">{product_name}</h2>
        </Link>
        <p>{product_description}</p>
        <p>tags: {tags}</p>
        <div className="flex gap-3 items-center flex-1">
          <p>Vote Count: {vote}</p>
        </div>
        <div className="card-actions justify-start">
          <UpVote id={_id} email={user_email} />
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.object,
};

export default ProductsCard;
