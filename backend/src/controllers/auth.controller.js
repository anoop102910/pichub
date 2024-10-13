import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET_KEY } from "../config/config.js";
import User from "../models/user.model.js";
import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
}).unknown(true);

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(true);

const signinToken = user => {
  return jwt.sign(
    { userId: user._id, username: user.name, verified: user.verified },
    JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
};


export const signup = async (req, res) => {
  try {
    const { value, error } = signupSchema.validate(req.body);
    console.log(error);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { name, email, password } = value;

    if (await User.exists({ email })) return res.status(409).json({ error: "User already exists" });

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 11),
    });

    const token = signinToken(user);
    res.status(200).json({ succuss: true, message: "Signin succussful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { value, error } = signinSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;

    let user = await User.findOne({ email }).lean();

    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ error: "Password is incorrect" });

    const token = signinToken(user);
    if (user.profileImage) tokenVal.profileImage = user.profileImage;

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.status(200).json({ succuss: true, message: "Signin succussfull", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

