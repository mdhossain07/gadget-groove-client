import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
const AddProducts = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  //   console.log(tags);
  const allTag = tags.map((tag) => tag.text);
  console.log(allTag);
  //   console.log(tagText);

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="bg-[#F3F3F3] font-medium text-[#444444] p-10 lg:w-1/2 mx-auto space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="">Product Name *</label>
        <br />
        <input className="w-full py-2 my-2" {...register("name")} />
        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <label htmlFor="">Select Category *</label>
            <br />
            <select
              className="py-2 w-full my-2"
              defaultValue="default"
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
        ></textarea>
        <br />
        <label htmlFor="">External Links</label>
        <input className="py-2 my-2 w-full" {...register("links")} />
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
        <input className="btn btn-warning" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddProducts;
