import Hero from "../hero/Hero";
import Foods from "../foods/Foods";
import Newletter from "../newletter/Newletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <div>*****HOME SECTION******</div>
      <Foods />
      <Newletter />
    </div>
  );
};

export default Home;
