import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";
import User from '../models/user.model.js';

const authMiddleware = async  (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: "Token not found" });

  token = token.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET_KEY, async (err, decode) => {
    if (err)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", error: "Token has expired" });
    const { userId } = decode;

    req.userId = userId;
    const user = await User.findById({ _id: userId });

    if(!user) return res.status(404).json("User not found");
    // if(!user?.verified) return res.status(404).json("User not verified");

    next();
  });

  
};

export default authMiddleware;
