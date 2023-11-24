import useProducts from "../../../../hooks/useProducts";

const MyProducts = () => {
  const [products] = useProducts();
  console.log(products);

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
              <th>Votes</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

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
                <td>{product.vote}</td>
                <td>{product.status}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
