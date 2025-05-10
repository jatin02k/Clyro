import express from "express";
import {
  signup,
  login,
  logout,
} from "../controllers/authController.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js"; 

const router = express.Router();

// create CRUD operation routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", isLoggedIn, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
  });
});

export default router;
