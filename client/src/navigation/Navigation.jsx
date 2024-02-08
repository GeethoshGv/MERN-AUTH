import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.user);

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
            <h1 className="auth-h1">SignIn</h1>
          </NavLink>
          <NavLink
            to="/sign-up"
            style={({ isActive }) => {
              return {
                color: isActive ? "red" : "black",
              };
            }}
          >
            {currentUser ? (
              <img src={currentUser.profilePicture} alt="profile" />
            ) : (
              <h1 className="auth-h1">SignUp</h1>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
