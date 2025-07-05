import User from "../models/user.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized Login" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = mongoose.Types.ObjectId.isValid(decoded.userId)
      ? await User.findById(decoded.userId).select("-password")
      : null;
    if (!user) return res.status(404).json({ message: "User not Found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
