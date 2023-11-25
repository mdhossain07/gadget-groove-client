import PropTypes from "prop-types";

const Title = ({ subHeading, heading }) => {
  return (
    <div className="border-y-2 border-blue-500 my-10 w-1/2 mx-auto text-center">
      <p>-----{subHeading}------</p>
      <h2 className="text-3xl font-semibold">{heading} </h2>
    </div>
  );
};
Title.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string,
};
export default Title;
