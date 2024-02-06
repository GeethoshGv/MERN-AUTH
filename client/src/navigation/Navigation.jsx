import React from "react";
import "./nav.scss";

const Navigation = () => {
  return (
    <nav>
      <div className="nav-div">
        <div className="title-div">
          <h1>MERN-AUTH</h1>
        </div>
        <div className="pages-div">
          <h2>Sign-In</h2>
          <h2>SignUp</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
