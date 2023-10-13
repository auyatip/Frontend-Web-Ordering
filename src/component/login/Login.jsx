import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "https://backend-web-ordering.onrender.com/api/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let token = data.data.token;
      localStorage.setItem("token", token);
      dispatch(login({ data, token })); // userInfo,token
      // console.log(data);
      navigate("/");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="bg-gray-400 mt-10 w-1/2 py-10 rounded-xl flex flex-col justify-center items-center">
        <form onSubmit={handleLogin}>
          <div>
            <span className="label-text text-white">Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              className="text-black input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div>
            <span className="label-text text-white">password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="text-black input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <button type="submit" className="btn btn-success mt-10">
            Success
          </button>
          <p>
            Dont Have an accout? <Link to="/signup">Sign UP</Link>
          </p>
        </form>
        {error && <div>Something Wrong!! , Try agian</div>}
      </div>
    </>
  );
};

export default Login;
