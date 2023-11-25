import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const imageApi = import.meta.env.VITE_Image_Hosting_API;
const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageApi}`;

const UpdateProduct = () => {
  const [tags, setTags] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState();
  const { id } = useParams();
  console.log(product);

  useEffect(() => {
    axiosPublic
      .get(`/api/v1/product/${id}`)
      .then((res) => setProduct(res.data));
  }, [axiosPublic, id]);

  const allTag = tags.map((tag) => tag.text);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const imagefile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingKey, imagefile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    const productInfo = {
      product_name: data.name,
      product_category: data.category,
      product_image: res.data.data.display_url,
      product_description: data.description,
      product_tags: allTag,
      external_link: data.links,
    };

    axiosSecure
      .patch(`/api/v1/update-product/${id}`, productInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Done!",
            text: "Your product been updated.",
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
        <label htmlFor="">Product Name *</label>
        <br />
        <input
          className="w-full py-2 my-2"
          {...register("name")}
          defaultValue={product?.product_name}
        />
        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Select Category *</label>
            <br />
            <select
              defaultValue={product?.product_category}
              className="py-2 w-full my-2"
              {...register("category")}
            >
              <option value="phone">phone</option>
              <option value="laptop">laptop</option>
              <option value="smartwatch">smartwatch</option>
              <option value="drone">drone</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="">Tag *</label>
            <br />
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
            />
          </div>
        </div>
        <label htmlFor="">Product Description *</label>
        <br />
        <textarea
          className="my-2 w-full"
          {...register("description")}
          cols="50"
          rows="5"
          defaultValue={product?.product_description}
        ></textarea>
        <br />
        <label htmlFor="">External Links</label>
        <input
          className="py-2 my-2 w-full"
          {...register("links")}
          defaultValue={product?.external_link}
        />
        <br />
        <input
          {...register("image")}
          type="file"
          className="file-input w-full max-w-xs"
        />
        <br />
        <hr />
        <h2> Product Owners Info</h2>

        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Owners Name</label>

            <input
              className="w-full py-2 my-2"
              defaultValue={user?.displayName}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="">Owners Email</label>
            <br />
            <input className="py-2 my-2 w-full" defaultValue={user?.email} />
          </div>
        </div>
        <div className="flex-1">
          <img className="w-[80px] rounded-full" src={user?.photoURL} alt="" />
        </div>
        <input
          className="btn btn-warning"
          type="submit"
          value="Update Product"
        />
      </form>
    </div>
  );
};

export default UpdateProduct;
