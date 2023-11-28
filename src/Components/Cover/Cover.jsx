const Cover = ({ coverImg }) => {
  console.log(coverImg);
  return (
    <div>
      <div
        className="hero h-[90vh] 
        "
        style={{
          backgroundImage: `url(${coverImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Products</h1>
            <p className="mb-5">
              Find out all the latest gadgets on our website
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
