import { useEffect } from "react";
import Container from "../../Components/Shared/Container";
import Cover from "../../Components/Cover/Cover";
import coverImg from "../../assets/images/contact_us_5a6756504e.jpg";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Contact = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Contact Us";
  }, []);

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    // console.log(data);
    const messageInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    axiosPublic.post("/api/v1/add-message", messageInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Done!",
          text: "Your message is sent!",
          icon: "success",
        });
        reset();
      }
    });
  };

  return (
    <div>
      <Cover
        coverImg={coverImg}
        title={"Contact Us"}
        description={"We are available 24 x 7 for your happiness"}
      />
      <Container>
        <form
          className="bg-[#F3F3F3] font-medium text-[#444444] mt-10 p-10 lg:w-1/2 mx-auto space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="">Your Name *</label>
          <br />
          <input
            required
            className="indent-2 w-full py-2 my-2"
            {...register("name")}
          />
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <label htmlFor="">Your Email *</label>
              <br />
              <input
                required
                className="indent-2 w-full py-2 my-2"
                {...register("email")}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="">Phone Number *</label>
              <br />
              <input
                required
                className="indent-2 w-full py-2 my-2"
                {...register("phone")}
              />
            </div>
          </div>
          <label htmlFor="">Your Message *</label>
          <br />
          <textarea
            className="my-2 w-full p-3"
            {...register("message")}
            cols="50"
            rows="5"
          ></textarea>
          <br />

          <hr />

          <input
            className="bg-[#8C52FF] hover:bg-[#6670ff] p-3 cursor-pointer text-center text-white rounded-lg"
            type="submit"
            value="Send Message"
          />
        </form>
      </Container>
    </div>
  );
};

export default Contact;
