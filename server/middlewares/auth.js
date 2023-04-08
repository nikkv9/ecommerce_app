import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const authToken = async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.jwtoken;
  if (!token) {
    return res.status(400).send("token not found");
  }
  const decode = jwt.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decode.id).select("-password");

  next();
};

export const authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).send("only admin can do that!");
    }
    next();
  };
};
