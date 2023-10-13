import { useSelector } from "react-redux";

const Checkout = () => {
  const { products } = useSelector((state) => state.cart);

  let totalprice = 0;
  products.map(
    (product) => (totalprice = totalprice + product.quantity * product.price)
  );
  return (
    <div className="mt-10">
      <div className="flex flex-col items-center">
        <h2 className="bg-gray-200 p-4 w-full font-bold text-black rounded-3xl">
          Your order is successful
        </h2>
        <div className="mt-5 bg-green-700 p-4 max-w-[40vh] rounded-3xl">
          <p>Expect finish within 1 hour.</p>
          <span className="">Total Price : {totalprice}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
