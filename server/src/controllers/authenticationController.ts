import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {UserDocument} from "./types";
import {isMongoError} from "./utils/errorUtils";
import Family from "../models/Family";


 const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, role, familyNickname  } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newFamily = new Family({ nickname: familyNickname  });
    await newFamily.save();

    if (!newFamily._id) {
      throw new Error('Failed to save family and retrieve its ID.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, role, familyNickname: newFamily._id });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    if (isMongoError(error) && error.code === 11000 && error.keyPattern?.nickname) {
      return res.status(400).json({ error: "Family nickname already exists" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

 const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as UserDocument;

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
