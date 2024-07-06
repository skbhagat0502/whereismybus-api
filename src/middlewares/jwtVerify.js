import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const jwtVerify = async (req, res, next) => {
  try {
    const token = req.headers["user-token"];
    if (!token) {
      return res.status(403).json({
        auth: false,
        error: "unauthorized",
        message: "Token expired",
      });
    }

    const data = jwt.verify(token, process.env.jwtSecret);

    const user_id = data.user.id;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(403).send({
        auth: false,
        error: "Unauthorized",
        message: "Access token expired!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      auth: false,
      error: "unauthorized",
      message: "Token expired",
    });
  }
};
