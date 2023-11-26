import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
