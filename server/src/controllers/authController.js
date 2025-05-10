import genToken from "../../utils/genToken.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password needs to be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    genToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });
        const correctedPassword = await bcrypt.compare(password,user.password);
        if(!correctedPassword) return res.status(400).json({ message:"Invalid Credentials" });
        genToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        })
    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie('token','',{
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message:"Logged Out Successfully" });
    } catch (error) {
        console.log("error in logging Out", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}