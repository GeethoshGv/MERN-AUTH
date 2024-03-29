import React from "react";
import "./oauth.scss";
import { app } from "../firebase/Firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice/userSlice.js";
import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/googlelogo.svg";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  return (
    <button type="button" className="oauth_button" onClick={handleGoogleClick}>
      <img src={googlelogo} alt="" />
      <h1>Google</h1>
    </button>
  );
};

export default Oauth;
