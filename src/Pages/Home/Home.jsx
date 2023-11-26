import { useEffect } from "react";
import Banner from "../../Components/Banner/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../Components/TrendingProducts/TrendingProducts";
import SecurityBanner from "../../Components/SecurityBanner/SecurityBanner";

const Home = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Home";
  }, []);
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <SecurityBanner />
      <TrendingProducts />
    </div>
  );
};

export default Home;
