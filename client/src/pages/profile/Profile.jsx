import "./profile.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profile_div">
      <h1>profile</h1>

      <div className="profile_form_div">
        <form action="">
          <div className="profile_img_div">
            <img src={currentUser.profilePicture} alt="" />
          </div>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
          />
          <input type="password" id="password" placeholder="password" />

          <input type="number" placeholder=" Age:" />

          <input type="tel" placeholder="  Phone Number:" />

          <input type="date" placeholder="    Date of Birth:" />

          <select className="gender-select">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="button_div_profile">
            <button>Update</button>
            <button>Sign-Out</button>
          </div>
          <span>Delete Account</span>
        </form>
      </div>
    </div>
  );
};

export default Profile;
