import { Link } from "react-router-dom";
import banner from "../../assets/images/pexels-michelangelo-buonarroti-8728388.jpg";

import "swiper/css/navigation";
const Banner = () => {
  return (
    <div
      className="hero h-[90vh] bg-fixed"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            New Collection coming to town
          </h1>
          <p className="mb-5">
            Introducing fashionable & gorgeous gadgets from design to stylish
            wearable
          </p>
          <Link to="/products">
            <button className="bg-[#8C52FF] font-medium p-3 rounded-lg text-white">
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
