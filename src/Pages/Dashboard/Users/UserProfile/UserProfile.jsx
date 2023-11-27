import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../MyProducts/Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useUser from "../../../../hooks/useUser";
import Stats from "../../../../Components/Stats/Stats";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const UserProfile = () => {
  const { userInfo } = useUser();

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold">Welcome Back, {userInfo?.name}</h2>

      <div className="flex items-center gap-10">
        <img
          className="w-[100px] rounded-full mt-10"
          src={userInfo?.image}
          alt=""
        />

        <div className="space-y-2">
          <p className="font-medium">Email: {userInfo?.email}</p>
          {userInfo?.membershipStatus ? (
            <p className="font-medium text-green-600">
              Membership Status: {userInfo?.membershipStatus}
            </p>
          ) : (
            <p className="font-medium text-red-500">
              Membership Status: not verified{" "}
            </p>
          )}
        </div>
      </div>

      {!userInfo?.membershipStatus && (
        <div>
          <p>
            To Enjoy more exciting features of our Webiste, Be a member of our
            website. Only on 500 BDT.
          </p>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-info"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Membership Subscribe
          </button>
        </div>
      )}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Checkout Form</h3>
          <p className="py-4">Please enter your Card info to Checkout</p>
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

      <Stats />
    </div>
  );
};

export default UserProfile;
