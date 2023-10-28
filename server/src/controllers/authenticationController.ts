import { Request, Response } from "express";
import authenticationService from "../service/authenticationService";
import {util} from "zod";
import find = util.find;
import User from "../models/User";
import {UserDocument} from "./types";


const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, familyName, password } = req.body;

    await authenticationService.register(username, email, familyName, password);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const userDocument = await User.findOne({ email }, '_id role') as UserDocument;

    if (!userDocument) {
      return res.status(404).json({ error: "User not found" });
    }

    const userID = userDocument._id;
    const userRole = userDocument.role;

    const token = await authenticationService.login(email, password);

    return res.status(200).json({ token, userID, userRole});
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
