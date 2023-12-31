import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Title from "../../../../Components/Shared/Title";
import { useEffect } from "react";

const MyProducts = () => {
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    document.title = "Gadget Groove | My Products";
  }, []);

  const { user } = useAuth();
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/user-product?email=${user?.email}`
      );
      return res.data;
    },
  });

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
        <Title heading={"My Products"} subHeading={"Gadget Groove"} />
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">No.</th>
              <th className="text-lg">Image</th>
              <th className="text-lg">Product Name</th>
              <th className="text-lg">Votes</th>
              <th className="text-lg">Status</th>
              <th className="text-lg">Edit</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, index) => (
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
                <td className="font-medium">
                  {product.product_name}
                  <br />
                </td>
                <td className="font-medium text-lg">{product.vote}</td>
                <td className="font-medium">{product.status}</td>
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
