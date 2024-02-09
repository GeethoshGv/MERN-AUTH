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

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);

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

  return (
    <div className="profile_div">
      <h1>profile</h1>

      <div className="profile_form_div">
        <form action="">
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
