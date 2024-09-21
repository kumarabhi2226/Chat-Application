import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    //from user mode we get id'
    senderId: {
      //to generate relation between models
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //to store message
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageModel);
