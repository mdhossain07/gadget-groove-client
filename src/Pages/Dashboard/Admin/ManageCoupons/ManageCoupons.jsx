import { useQuery } from "@tanstack/react-query";
import Title from "../../../../Components/Shared/Title";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons } = useQuery({
    queryKey: ["coupons"],
    initialData: [],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/coupons");
      return res.data;
    },
  });

  console.log(coupons);

  return (
    <div>
      <Title heading={"Manage Coupons"} subHeading={"Gadget Groove"} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">No.</th>
              <th className="text-lg">Coupon Code</th>
              <th className="text-lg">Description</th>
              <th className="text-lg">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>{coupon.expiry_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
