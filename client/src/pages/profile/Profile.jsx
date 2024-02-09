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
} from "../../redux/userSlice/userSlice.js";

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

  return (
    <div className="profile_div">
      <h1>profile</h1>

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
          <p className="text-sm self-center">
            {imageError ? (
              <span>Error uploading image (size must be less than 2 MB)</span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span>Image uploaded successfully</span>
            ) : (
              ""
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <div className="button_div_profile ">
            <button>{loading ? "loading..." : "update"}</button>
          </div>
          <div className="button_div_profile ">
            <button>Delete</button>
            <button>sign-out</button>
          </div>
        </form>
      </div>
      <p>{error && "something went wrong"}</p>
      <p>{updateSuccess && "profile updated successfully"}</p>
    </div>
  );
};

export default Profile;
