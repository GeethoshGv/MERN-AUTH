//verify the user using json Web Token

import jwt from "jsonwebtoken";
import { handelError } from "./handelError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(handelError(401, "access denied"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(handelError(403, "token is not valid"));

    req.user = user;
    next();
  });
};
