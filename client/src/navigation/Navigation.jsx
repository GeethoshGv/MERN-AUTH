import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="nav-div">
        <div className="title-div">
          <Link to="/">
            <h1>MERN-AUTH</h1>
          </Link>
        </div>
        <div className="pages-div">
          <NavLink
            to="/sign-in"
            style={({ isActive }) => {
              return {
                color: isActive ? "red" : "black",
              };
            }}
          >
            <h1>Sign-In</h1>
          </NavLink>
          <NavLink
            to="/sign-up"
            style={({ isActive }) => {
              return {
                color: isActive ? "red" : "black",
              };
            }}
          >
            <h1>SignUp</h1>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
