import useAuth from "../../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  const isVerified = true;
  return (
    <div>
      <h2>Welcome Back, {user?.displayName}</h2>
      <img className="w-[80px] rounded-full" src={user?.photoURL} alt="" />
      <p>Email: {user?.email}</p>
      {isVerified && <p>Membership Status: verified </p>}
      <p>
        To Enjoy more exciting features of our Webiste, Be a member of our
        website. Only on $99
      </p>
      {/* <button className="btn btn-accent">Subscribe</button> */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Subscribe
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
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
