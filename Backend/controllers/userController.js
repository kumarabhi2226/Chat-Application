// in controller business logic means user registration, login,logout
import { User } from "../models/userModel.js";
//this is the registration portion

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//it is used for strong password for this bycrpt is used to make password more than for different character
export const register = async (req, res) => {
  try {
    //for checking of pasword bycrypt is used
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password === !confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username Already exist try different" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //profilephoto
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    //
    await User.create({
      fullName,
      username,
      //this key:value
      password: hashedPassword,
      //this is ternary operator
      profilePhoto: gender === " male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({
      message: "Account created sucessfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//here registration process is completed
//after providing business logic we need to route in backend

//This is for register logic  in above part and we had  done same  login part

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password.",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
      //now we store token in cookies of browsers
    });
    // second in token is secret key
    // token variable:token data
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        //to provide more security we use this
      })
      .json({
        //this is returning as client side as response in json format
        _id: user.username,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};
// to generate token we use jwt token to vrify we login and we check whether the user is login or logout
export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true, // Security: prevent access via JavaScript
        sameSite: "Strict",
      })
      .json({
        message: "Logged out successfully.",
      });
  } catch (error) {
    console.log(error);
  }
};
//to show all users in side just like whatsapp
export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
