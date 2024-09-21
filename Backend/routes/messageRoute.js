import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middlware/isAuthenticated.js";
const router = express.Router();
// this is message route
router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated,getMessage);
//this id is used for params
export default router;
