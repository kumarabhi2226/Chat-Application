import mongoose from "mongoose";
import { User } from "./userModel.js";

const conversationModel = new mongoose.Schema({
  participants: [
    //we have to put user id here
    // in participants we store id od perso
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  //we hae to put message id
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
export const Conversation = mongoose.model("Conversation", conversationModel);
