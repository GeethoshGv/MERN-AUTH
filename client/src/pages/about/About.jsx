
import React from "react";
import "./about.scss";

const About = () => {
  return (
    <div className="about_div ">
      <h1 className="tech_stack">Features</h1>

      <div className="tech">
        <div>
          <h1>Firebase Authentication </h1>
          <p>Enable seamless user access with Google Sign-In.</p>
          <p>
            Empower users to effortlessly log in using their Google credentials{" "}
          </p>
        </div>

        <div>
          <h1> Redux Persist</h1>
          <p>
            Preserve user authentication state persistently across app sessions
          </p>
          <p>
            Maintaining authentication status, even when users close and reopen
            your app.{" "}
          </p>
        </div>

        <div>
          <h1>Bcrypt</h1>
          <p>
            Using Bcrypt for robust password hashing, safeguarding user
            credentials against unauthorized access.
          </p>
        </div>
        <div>
          <h1>JSON Web Token </h1>
          <p>
            Securely transmit user information between client and server using
            compact, URL-safe tokens
          </p>
        </div>
        <div>
          <h1>Others </h1>
          <p>
            User can update there password , username , profile ,age , DOB ,
            gender,phone number
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

