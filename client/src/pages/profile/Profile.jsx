import "./profile.scss";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/Firebase.js";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../../redux/userSlice/userSlice.js";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState();

  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile_div">
      <h1>Profile</h1>

      <div className="profile_form_div">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="profile_img_div">
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="picture"
              onClick={() => fileRef.current.click()}
            />
          </div>
          <p>
            {imageError ? (
              <span>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span>Image uploaded successfully</span>
            ) : (
              ""
            )}
          </p>

          <div className="in_div">
            <label htmlFor="">Username:</label>
            <input
              defaultValue={currentUser.username}
              type="text"
              id="username"
              onChange={handleChange}
            />
          </div>

          <div className="in_div">
            <label htmlFor="">Email:</label>

            <input
              defaultValue={currentUser.email}
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="in_div">
            <label htmlFor="">Password:</label>

            <input type="password" id="password" onChange={handleChange} />
          </div>

          <p>{error && "Something went wrong!"}</p>
          <p>{updateSuccess && "User is updated successfully!"}</p>
          <div className="button_div_profile ">
            <button>{loading ? "loading..." : "Update"}</button>
          </div>
          <div className="button_div_profile ">
            <button onClick={handleDeleteAccount}>Delete</button>
            <button onClick={handleSignOut}>Sign-out</button>
          </div>
        </form>
      </div>

      <Toaster position="top" />
    </div>
  );
};

export default Profile;
