import { useForm } from "react-hook-form";
import Title from "../../../../Components/Shared/Title";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCoupons = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const couponInfo = {
      code: data.code,
      expiry_date: data.date,
      amount: data.amount,
      description: data.description,
    };

    axiosSecure.post("/api/v1/add-coupon", couponInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "You created this coupon!",
          icon: "success",
        });
        reset();
      }
    });
  };
  return (
    <div>
      <div>
        <Title subHeading={"Get Coupons"} heading={"Manage Coupons"} />
        <form
          className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="">Coupon Code *</label>
          <br />
          <input
            required
            className="indent-2 w-full py-2 my-2"
            {...register("code")}
          />
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <label htmlFor="">Expiry Date *</label>
              <br />
              <input
                type="date"
                required
                className="indent-2 w-full py-2 my-2"
                {...register("date")}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="">Discount Amount *</label>
              <br />
              <input
                required
                className="indent-2 w-full py-2 my-2"
                {...register("amount")}
              />
            </div>
          </div>
          <label htmlFor="">Coupon Code Description *</label>
          <br />
          <textarea
            className="my-2 w-full  p-3"
            {...register("description")}
            cols="50"
            rows="5"
          ></textarea>
          <br />

          <input
            className="btn btn-warning"
            type="submit"
            value="Create Coupon"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCoupons;
