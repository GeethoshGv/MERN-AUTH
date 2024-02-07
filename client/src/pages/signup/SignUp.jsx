import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signup.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password !== formData.conformPassword) {
        setPassword("Passwords do not match");
        return;
      } else if (formData.password === formData.conformPassword) {
        setPassword("Passwords matched");
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (data.success === true) {
        setError("User registration failed. Please check your details.");
        return;
      }
      navigate("/sign-in");

      // setError(null);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="signup_div">
      <div className="form_div">
        <h1>Sign Up</h1>

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
          <div className="pass_check">
            <p>{password}</p>
          </div>
          <div className="input_div button_div">
            <button>{loading ? "Loading..." : "SIGN UP"}</button>
          </div>
          <div className="bottom-text">
            <p>Have an account:</p>
            <Link to="/sign-in">
              <span>Sign in</span>
            </Link>
          </div>
          <p>{error && <span className="error-message">{error}</span>}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
