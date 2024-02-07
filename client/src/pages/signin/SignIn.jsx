import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import "./signup.scss";
// import { toast } from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success === true) {
        setError("User registration failed. Please check your details.");
        return;
      }
      navigate("/");

      setError(null);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="signup_div">
      <div className="form_div">
        <h1>SignIn</h1>

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

          <div className="input_div button_div">
            <button>{loading ? "Loading..." : "SIGN IN"}</button>
          </div>
          <div className="bottom-text">
            <p>Dont Have an account:</p>
            <Link to="/sign-up">
              <span>Sign Up</span>
            </Link>
          </div>
          <p>{error && <span className="error-message">{error}</span>}</p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
