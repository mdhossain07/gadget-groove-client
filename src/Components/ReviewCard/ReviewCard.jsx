const ReviewCard = ({ item }) => {
  const { user_name, rating, review, user_image } = item;
  console.log(item);
  return (
    <div className="flex items-center">
      <div className="bg-white shadow-md rounded-md mt-10 relative p-16 w-9/12 space-y-2 mx-auto">
        <h2 className="text-black text-xl font-medium">{user_name}</h2>
        <p className="text-gray-400 text-sm">Rating: {rating}</p>
        <div>
          <img
            className="w-20 h-20 rounded-full border-4  absolute -left-10 top-12"
            src={user_image}
            alt={user_name}
          />
        </div>

        <p className="text-slate-600 text-md"> {review} </p>
      </div>
    </div>
  );
};

export default ReviewCard;
