import User from "../model/User.js";
import bcryptjs from "bcryptjs";

export const SignUp = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10); //hashing the password using bcrypt
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};
