import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  let totalprice = 0;

  let isLogin = token ? true : false;
  products.map(
    (product) => (totalprice = totalprice + product.quantity * product.price)
  );
  const handleRemoveProduct = (id) => {
    console.log(id);
    dispatch(removeProduct({ _id: id }));
  };

  const handleOrder = () => {
    if (products.length > 0) {
      navigate("/checkout");
    }
  };
  console.log(products);
  return (
    <>
      <div className="flex justify-center mt-10 gap-10">
        {isLogin ? (
          <div className="mx-2">
            <div className="grid grid-cols-2 max-w-md border-r pr-10">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="m-2 text-black bg-slate-300 p-4 rounded-lg min-h-[30vh]"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      <AiOutlineClose />
                    </div>
                    <img
                      className="max-h-[30vh] "
                      src={product.img}
                      alt={product.title}
                    />
                    <div>
                      <h3>{product.title}</h3>
                      <div>
                        <span>{product.quantity} x </span>
                        <span>
                          <span>฿</span>
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Product in Your Cart..</h1>
              )}
            </div>
            <div className="border-sky-100 h-[30vh] align-middle rounded-lg shadow-xl bg-gray-800 border max-h- p-10 flex flex-col">
              <div className="">Total Product : {products.length}</div>
              <div className="flex flex-col">
                <span className="mt-5 font-bold text-xl rounded-full bg-slate-100 text-black p-4">
                  All Total : ฿{totalprice}
                </span>
                <button
                  className="btn btn-success mt-5"
                  onClick={handleOrder}
                  disabled={products.length === 0}
                >
                  Order now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Please Login you account before shopping</div>
        )}
      </div>
    </>
  );
};

export default Cart;
