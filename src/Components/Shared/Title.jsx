import PropTypes from "prop-types";

const Title = ({ subHeading, heading }) => {
  return (
    <div className="my-10">
      <p className="text-[#8C52FF] font-medium text-center">
        {" "}
        ---{subHeading}---{" "}
      </p>
      <div className="border-y-4 w-4/12 my-3 py-3 text-center mx-auto">
        <h2 className="text-4xl font-medium">{heading}</h2>
      </div>
    </div>
  );
};
Title.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string,
};
export default Title;
