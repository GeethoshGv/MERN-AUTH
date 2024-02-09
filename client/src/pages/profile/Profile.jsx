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
            <img src={currentUser.profilePicture} alt="picture" />
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
          <div className="button_div_profile ">
            <button>Update</button>
          </div>
          <div className="button_div_profile ">
            <button>Delete</button>
            <button>sign-out</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
