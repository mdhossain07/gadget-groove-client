import { Link } from "react-router-dom";
import useProducts from "../../../../hooks/useProducts";
import Accept from "../../../../Components/Accept/Accept";
import Featured from "../../../../Components/Featured/Featured";
import Reject from "../../../../Components/Reject/Reject";

const ProductReview = () => {
  const [products] = useProducts();
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Featured</th>
              <th>Accept</th>
              <th>Reject</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.product_image}
                          alt={product.product_name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {product.product_name}
                  <br />
                </td>
                <td>
                  <Featured id={product._id} status={product.status} />
                </td>
                <td>
                  <Accept id={product._id} status={product.status} />
                </td>

                <td>
                  <Reject id={product._id} status={product.status} />
                </td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-info">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
