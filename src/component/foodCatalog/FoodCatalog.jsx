import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const location = useLocation();
  // console.log(location.pathname.split("/")[2]); //เช็ค path url
  const foodEndpoint = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await axios.get(
        `https://backend-web-ordering.onrender.com/api/products?category=${foodEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res);
      setFilteredFoods(res.data);
    };
    fetchFoodType();
  }, [foodEndpoint]);

  // console.log(filteredFoods);
  return (
    <div>
      <section id="foods" className="mt-10 flex items-center justify-center">
        <div className="grid justify-center items-center lg:grid lg:gap-10 lg:grid-cols-2 xl:grid xl:grid-cols-3">
          {filteredFoods.length !== 0 &&
            filteredFoods.map((item) => (
              <Link
                to={`/food/${item._id}`}
                key={item._id}
                className="hover:scale-105"
              >
                <div className="flex w-[300px]">
                  <img src={item?.img} className="h-full"></img>
                </div>
                <div className="relative">
                  <h2>Name : {item.title}</h2>
                  <h4>Strain : {item.category}</h4>
                  <span>Description: {item.description}</span>
                  <h4>Price: {item.price}</h4>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default FoodCatalog;
