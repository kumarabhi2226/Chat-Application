//it is server file
import express from "express"; //method-2
//tis below two line give about information which is written in dotenv file
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({});
const app = express();

const PORT = process.env.PORT || 5000;

//middlewares

app.use(express.urlencoded({extended:true}));
app.use(express.json());
//this is middlewares when you send responses from client side
//this middlewares start to run and client side data must be json

app.use(cookieParser());
//to get the idea from where we get request use coarseparer to get backend and frontend data connected

const corsOption={
  origin: 'http://localhost:3000',
  credentials:true 
};
app.use(cors(corsOption));


//routes
//middlewares provides routes that we canuse
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
//how to make it api andhow localhost looks like
// http://localhost:8080/api/v1/user/register
//userRoute is userController
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
