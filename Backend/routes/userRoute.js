import express from "express";
//express has router sp we import router here
import {
  register,
  login,
  logout,
  getOtherUsers,
} from "../controllers/userController.js";
import isAuthenticated from "../middlware/isAuthenticated.js";

const router = express.Router();
//method is post
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
//get OtherUsers comes when user is authnticated and logged in then this route is going to be run
router.route("/").get(isAuthenticated, getOtherUsers);
export default router;
