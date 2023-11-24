import { Link } from "react-router-dom";
import useProducts from "../../../../hooks/useProducts";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MyProducts = () => {
  const [products, refetch] = useProducts();
  const axiosPublic = useAxiosPublic();

  const handleRemove = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/api/v1/delete-product/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your product been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

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
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="p-3 rounded-lg bg-green-500 text-white">
                      <FaRegEdit className="text-md" />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="p-3 rounded-lg bg-red-500 text-white"
                  >
                    <FaTrashAlt className="text-md" />
                  </button>
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
