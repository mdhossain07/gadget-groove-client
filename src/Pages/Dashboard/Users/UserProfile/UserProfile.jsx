import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../MyProducts/Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useUser from "../../../../hooks/useUser";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const UserProfile = () => {
  const { userInfo } = useUser();
  console.log(userInfo);

  return (
    <div>
      <h2>Welcome Back, {userInfo?.name}</h2>
      <img className="w-[80px] rounded-full" src={userInfo?.image} alt="" />
      <p>Email: {userInfo?.email}</p>
      {userInfo?.membershipStatus ? (
        <p>Membership Status: {userInfo?.membershipStatus} </p>
      ) : (
        <p>Membership Status: not verified </p>
      )}
      <p>
        To Enjoy more exciting features of our Webiste, Be a member of our
        website. Only on $99
      </p>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-info"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Membership Subscribe
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;
