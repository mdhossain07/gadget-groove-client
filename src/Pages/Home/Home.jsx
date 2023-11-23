import { useEffect } from "react";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
  useEffect(() => {
    document.title = "Gadget Groove | Home";
  }, []);
  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
