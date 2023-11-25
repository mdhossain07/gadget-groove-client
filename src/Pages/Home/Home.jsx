import { useEffect } from "react";
import Banner from "../../Components/Banner/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Home";
  }, []);
  return (
    <div>
      <Banner />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
