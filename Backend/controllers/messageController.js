// //business logic of message
// import { Conversation } from "../models/conversationModel.js";
// import { Message } from "../models/messageModel.js";
// export const sendMessage = async (req, res) => {
//   try {
//     //two things we are needed for messaging one is sender and other is receiver
//     //we get senderid through request
//     //middlewares works between request and response you set the id in request.id and you get
//     //sender id is basically logged in users id
//     const senderId = req.id;
//     const receiverId = req.params.id;
//     const { message } = req.body;
//     //this is used for finding sender and receiver
//     //and if we not able to find it then
//     let gotConversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     if (!gotConversation) {
//       gotConversation = await Conversation.create({
//         participants: { senderId, receiverId },
//       });
//     }
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });
//     if (newMessage) {
//       gotConversation.messages.push(newMessage._id);
//     }

//     await gotConversation.save();

//     return res.status(201).json({
//       message:"Message send succesfully"
//     })
//   } catch (error) {
//     console.log(error);
//   }
// };

import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import mongoose from 'mongoose'; // Import mongoose to use ObjectId

export const sendMessage = async (req, res) => {
  try {
    // Get the senderId from the logged-in user (middleware sets this)
    const senderId = req.id;
    // Get the receiverId from the URL params
    const receiverId = req.params.id;
    const { message } = req.body;

    // Validate senderId and receiverId as ObjectId
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    // Find the conversation between the two users
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId], // Pass participants as an array of ObjectId
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Add the message to the conversation's message array
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save(); // Save the updated conversation
    }

    // Respond with a success message
    return res.status(201).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export const getMessage=async(req,res)=>{
  try{
const receiverId=req.params.id;
const senderId=req.id;
//to get only participants message
const conversation=await Conversation.findOne({
participants:{$all:[senderId,receiverId]}
}).populate("messages");
//we use populate function to display messages from all id
console.log(conversation);
return res.status(200).json(conversation?.messages);
  }catch(error){
console.log(error);
  }
}