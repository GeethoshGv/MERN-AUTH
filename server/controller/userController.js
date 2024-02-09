import { handelError } from "../utils/handelError.js";
import bcryptjs from "bcryptjs";
import User from "../model/User.js";

export const one = (req, res) => {
  res.json({
    message: "one",
  });
};

export const updateUser = async (req, res, next) => {
  //update user

  if (req.user.id !== req.params.id) {
    return next(handelError(401, "you can update only your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
