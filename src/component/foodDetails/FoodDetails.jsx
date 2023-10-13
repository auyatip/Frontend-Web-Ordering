import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../redux/cartSlice";

const foodDetails = () => {
  const [foodDetails, setfoodDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);
  // console.log(token);
  // console.log(products);
  let isLogin = token ? true : false;
  // console.log(isLogin);
  //
  useEffect(() => {
    const dataFood = async () => {
      const res = await axios.get(
        `https://backend-web-ordering.onrender.com/api/products/find/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      setfoodDetails(res.data);
    };
    dataFood();
  }, [id]);

  const changeQuantity = (command) => {
    if (command === "dec") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    } else if (command === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };
  //ทำ Redux Cart ไปต่อ Store
  const addToCart = () => {
    dispatch(addProduct({ ...foodDetails, quantity }));
  };

  return (
    <section className="flex mt-10 items-center justify-center">
      {isLogin ? (
        <div className="">
          <div className="">
            <div className="card w-96 glass">
              <figure>
                <img src={foodDetails.img} alt={foodDetails.name} />
              </figure>
              <div className="card-body">
                <div>
                  <button
                    disabled={quantity === 1}
                    onClick={() => changeQuantity("dec")}
                  >
                    -
                  </button>
                  <span className="p-3">{quantity}</span>
                  <button onClick={() => changeQuantity("inc")}>+</button>
                </div>
                <h2 className="card-title flex flex-col uppercase text-blue-300">
                  {foodDetails.title}
                  <span>⭐ Rating : {foodDetails.review}/5 ⭐</span>
                </h2>
                <p>{foodDetails.description}</p>
                <div>
                  <h3>Category :</h3>
                  <span>{foodDetails.category}</span>
                </div>
                <div className="card-actions justify-center">
                  <span className=" text-black bg-white w-2/3 rounded-full py-2 mb-4">
                    {foodDetails.price} บาท / 1 ea.
                  </span>
                </div>

                <div className="card-actions justify-center">
                  <button
                    className="btn btn-outline btn-success w-full"
                    onClick={addToCart}
                  >
                    CONFIRM <AiOutlineShoppingCart size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Please Login you account before shopping</div>
      )}
    </section>
  );
};

export default foodDetails;
