import { Request, Response } from "express";
import authenticationService from "../service/authenticationService";


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

    const token = await authenticationService.login(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
