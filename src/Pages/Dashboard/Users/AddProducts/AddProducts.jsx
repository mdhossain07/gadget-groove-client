import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Title from "../../../../Components/Shared/Title";

const imageApi = import.meta.env.VITE_Image_Hosting_API;
const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageApi}`;

const AddProducts = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const allTag = tags.map((tag) => tag.text);
  console.log(allTag);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const imagefile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingKey, imagefile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    const productInfo = {
      user_name: user?.displayName,
      user_email: user?.email,
      user_image: user?.photoURL,
      product_name: data.name,
      product_category: data.category,
      product_image: res.data.data.display_url,
      product_description: data.description,
      product_tags: allTag,
      vote: 0,
      downVote: 0,
      status: "pending",
      external_link: data.links,
      timestamp: new Date(),
    };

    axiosSecure.post("/api/v1/add-product", productInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "New Product is added!",
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Only verified user can add multiple products!",
          icon: "error",
        });
      }
    });
  };

  return (
    <div>
      <Title subHeading={"Latest Gadgets"} heading={"Add a product"} />
      <form
        className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="">Product Name *</label>
        <br />
        <input
          required
          className="indent-2 w-full py-2 my-2"
          {...register("name")}
        />
        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Select Category *</label>
            <br />
            <select
              className="py-2 w-full my-2 indent-2"
              defaultValue="default"
              required
              {...register("category")}
            >
              <option value="phone">phone</option>
              <option value="laptop">laptop</option>
              <option value="smartwatch">smartwatch</option>
              <option value="drone">drone</option>
              <option value="headphone">headphone</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="">Tag *</label>
            <br />
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              required
            />
          </div>
        </div>
        <label htmlFor="">Product Description *</label>
        <br />
        <textarea
          className="my-2 w-full indent-2 p-3"
          {...register("description")}
          cols="50"
          rows="5"
        ></textarea>
        <br />
        <label htmlFor="">External Links</label>
        <input className="py-2 my-2 w-full indent-2" {...register("links")} />
        <br />
        <input
          {...register("image")}
          type="file"
          className="file-input w-full max-w-xs"
          required
        />
        <br />
        <hr />
        <h2 className="text-blue-500 font-semibold"> Product Owners Info</h2>

        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Name</label>
            <input
              className="w-full py-2 my-2"
              defaultValue={user?.displayName}
              disabled
            />
          </div>
          <div className="flex-1">
            <label htmlFor="">Email</label>
            <br />
            <input
              className="py-2 my-2 w-full"
              defaultValue={user?.email}
              disabled
            />
          </div>
        </div>
        <div className="flex-1">
          <img className="w-20 h-20 rounded-full" src={user?.photoURL} alt="" />
        </div>
        <input className="btn btn-warning" type="submit" value="Add Product" />
      </form>
    </div>
  );
};

export default AddProducts;
