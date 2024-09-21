//it is used for authentication and authorisation
import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decode);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    //decode is an object we can proof it
    req.id = decode.userId;
    //tokendata we get inside decode

//first is authinticated function runs till decode
    //next is responsible for running next function
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;

//this is like a object we put the value inside it
const req = {
  id: " ",
};
req.id = "sdlgbnjdfn";
