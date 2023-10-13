import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { emptyCart, clearCart } from "../redux/cartSlice";
import jwt_decode from "jwt-decode";
import { useState } from "react";
const Navbar = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // const decode = jwt_decode(token);
  const isAdmin = token ? jwt_decode(token).isAdmin : false;
  //ซ่อนเมนู
  let isLogin = token ? true : false;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-gray-600 lg:sticky lg:top-0 z-50 lg:shadow-xl lg:shadow-gray-900">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            MillerAuie
          </Link>
        </div>
        <div className="">
          <ul className="flex items-center mr-10">
            <li className="mx-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mx-2">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="mx-2">
              <Link to="/foods">Foods</Link>
            </li>
            <li className="mx-2">
              <Link to="/faq">FAQ</Link>
            </li>
            {isAdmin && (
              <li className="mx-2">
                <Link to="/create">Create</Link>
              </li>
            )}

            <div className="hidden lg:flex lg:flex-row lg:gap-4 lg:items-center">
              <Link to="/login">
                <AiOutlineUser size={25} className="cursor-pointer" />
              </Link>
              <Link to="/cart" className="flex items-center mx-4">
                <AiOutlineShoppingCart size={40} className="absolute" />
                <div className="bg-red-500 rounded-full px-2 relative ">
                  {products.length}
                </div>
              </Link>
              {isLogin ? (
                <button onClick={handleLogout} className="btn btn-error">
                  LOGOUT
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button>Register</button>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
      <div className="flex bg-gray-700 z-50 items-center sticky top-0 lg:hidden bottom-0 justify-end p-3 gap-4 lg:gap-2 lg:mr-4 ">
        <Link to="/login" className="">
          <AiOutlineUser size={25} className="cursor-pointer" />
        </Link>
        <Link to="/cart" className="flex items-center mx-4">
          <AiOutlineShoppingCart size={40} className="absolute" />
          <div className="bg-red-500 rounded-full px-2 relative ">
            {products.length}
          </div>
        </Link>
        {isLogin ? (
          <button onClick={handleLogout} className="btn btn-error">
            LOGOUT
          </button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
