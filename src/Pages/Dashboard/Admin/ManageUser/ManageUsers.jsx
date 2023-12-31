import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Gadget Groove | Manage Users";
  }, []);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/users");
      return res.data;
    },
  });

  const handleModerator = (user) => {
    axiosSecure.patch(`/api/v1/make-moderator/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: `${user?.name} is Moderator Now!`,
          icon: "success",
        });
      }
    });
  };

  const handleAdmin = (user) => {
    axiosSecure.patch(`/api/v1/make-admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          text: `${user?.name} is Admin Now!`,
          icon: "success",
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
              <th className="text-lg">No.</th>
              <th className="text-lg">Image</th>
              <th className="text-lg">User Name</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Membership Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.image} alt={user.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">
                  {user.name}
                  <br />
                </td>

                <td>
                  {user?.role === "moderator" ? (
                    <h2 className="font-semibold text-green-500 text-xl">
                      Moderator
                    </h2>
                  ) : (
                    <button
                      onClick={() => handleModerator(user)}
                      className="btn btn-warning"
                    >
                      Make Moderator
                    </button>
                  )}
                </td>
                <td>
                  {user?.role === "admin" ? (
                    <h2 className="font-semibold text-red-500 text-xl">
                      Admin
                    </h2>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="btn btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="font-medium">{user?.membershipStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
