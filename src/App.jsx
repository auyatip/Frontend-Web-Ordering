import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import "./App.css";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import Create from "./component/create/Create";
import FoodDetails from "./component/foodDetails/FoodDetails";
import FoodCatalog from "./component/foodCatalog/FoodCatalog";
import Cart from "./component/cart/Cart";
import Checkout from "./component/checkout/Checkout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Foods from "./component/foods/Foods";
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/foods/:id" element={<FoodCatalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
