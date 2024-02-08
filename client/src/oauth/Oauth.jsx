import React from "react";
import "./oauth.scss";
import { app } from "../firebase/Firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";

const Oauth = () => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider); //result

      const res = await fetch("api/user/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          verified: result.user.emailVerified,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not login with Google Auth".error);
    }
  };

  return (
    <button type="button" className="oauth_button" onClick={handleClick}>
      Google
    </button>
  );
};

export default Oauth;
