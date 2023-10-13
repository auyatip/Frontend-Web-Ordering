import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const User = await axios.post(
        "https://backend-web-ordering.onrender.com/api/users/register",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (User) {
        dispatch(register(User)); // userInfo,token
        console.log(User);
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("Something Wrong..");
    }
  };

  return (
    <div>
      <div className="bg-gray-400 mt-10 w-1/2 py-10 rounded-xl flex flex-col justify-center items-center">
        <h2>Sign Up Form</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name">Username : </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border bg-gray-500"
              type="text"
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border bg-gray-500"
              type="email"
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border bg-gray-500"
              type="password"
            ></input>
          </div>
          <button type="submit" className="border p-2 m-2 bg-green-700">
            Sign Up
          </button>
        </form>
        <br></br>

        <Link to="/login" className="">
          <p>Already have account.</p>Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
