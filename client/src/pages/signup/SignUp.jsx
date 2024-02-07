import React from "react";
import { Link } from "react-router-dom";
import "./signup.scss";

const SignUp = () => {
  return (
    <div className="signup_div">
      <div className="form_div">
        <h1>SignUp</h1>

        <form action="">
          <div className="input_div">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              // placeholder="username"
              id="username"
              className="username_input input-style"
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              // placeholder="Email"
              id="email"
              className="email_input input-style"
            />
          </div>

          <div className="input_div">
            <label htmlFor="">Password:</label>

            <input
              type="password"
              // placeholder="Password"
              id="password"
              className="password_input input-style"
            />
          </div>

          <div className="input_div">
            <label htmlFor="">ConformPassword:</label>

            <input
              type="conformPassword"
              // placeholder="ConformPassword"
              id="conformPassword"
              className="conformPassword_input input-style"
            />
          </div>
          <div className="input_div button_div">
            <button>SIGN UP</button>
          </div>
          <div className="bottom-text">
            <p>Have an account:</p>
            <Link to="/sign-in">
              <span>Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
