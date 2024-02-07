import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./signup.scss";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.conformPassword) {
      console.log("Passwords do not match");
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="signup_div">
      <div className="form_div">
        <h1>SignUp</h1>

        <form onSubmit={handleSubmit}>
          <div className="input_div">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              // placeholder="username"
              id="username"
              className="username_input input-style"
              onChange={handleChange}
            />
          </div>
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

          <div className="input_div">
            <label htmlFor="">ConformPassword:</label>

            <input
              type="password"
              // placeholder="ConformPassword"
              id="conformPassword"
              className="conformPassword_input input-style"
              onChange={handleChange}
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
