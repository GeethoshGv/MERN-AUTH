import "./nav.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation() {
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
          <Link to="/about">
            <h1 className="auth-h1">About</h1>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.profilePicture} alt="profile" />
            ) : (
              <h1 className="auth-h1">Sign In</h1>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
