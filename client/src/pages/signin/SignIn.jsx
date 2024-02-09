import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Oauth from "../../oauth/Oauth.jsx";
import "./signin.scss";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/userSlice/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="signup_div">
      <div className="form_div">
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input_div">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              // placeholder="Email"
              id="email"
              className="email_input input-style"
              onChange={handleChange}
            />
          </div>

          <div className="input_div">
            <label htmlFor="">Password:</label>

            <input
              type="password"
              // placeholder="Password"
              id="password"
              className="password_input input-style"
              onChange={handleChange}
            />
          </div>
          <p className="signin_error">
            {error ? error.message || "Something went wrong!" : ""}
          </p>

          <div className="input_div button_div_sign">
            <button>{loading ? "Loading..." : "SIGN IN"}</button>
            <span>Or</span>
            <Oauth />
          </div>
          <div className="bottom-text">
            <p>Dont Have an account:</p>
            <Link to="/sign-up">
              <span>Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
