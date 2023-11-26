import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const Reviews = ({ id }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const reviewInfo = {
      user_name: user?.displayName,
      user_image: user?.photoURL,
      sid: id,
      review: data.review,
      rating: data.rating,
    };

    console.log(reviewInfo);

    axiosPublic.post("/api/v1/add-review", reviewInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "Review submitted!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <form
        className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="">Your Review *</label>
        <br />
        <textarea
          className="my-2 w-full"
          {...register("review")}
          cols="50"
          rows="5"
        ></textarea>
        <br />
        <label htmlFor="">Rating</label>
        <input className="py-2 my-2 w-full" {...register("rating")} />
        <br />

        <hr />
        <h2 className="text-xl font-medium text-blue-600"> Reviewers Info</h2>

        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Name: </label>

            <input
              className="w-full py-2 my-2"
              disabled
              defaultValue={user?.displayName}
            />
          </div>
          <div className="flex-1">
            <img
              className="w-[80px] rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </div>
        </div>

        <input
          className="btn btn-warning"
          type="submit"
          value="Submit Review"
        />
      </form>
    </div>
  );
};
Reviews.propTypes = {
  id: PropTypes.string,
};

export default Reviews;
