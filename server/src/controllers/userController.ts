import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer'
import {Schema} from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongodb').ObjectId;


export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email, adminID} = req.body;
        console.log(adminID)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const admin = await User.findById(adminID);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const familyID = admin.familyID;

        if (!familyID) {
            return res.json({ message: "Family not found for the user" });
        }

        const randomPassword = Math.random().toString(36).slice(-8); // Generate a random password
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const user = new User({ email, password: hashedPassword, username, familyID: familyID, role: 'USER' });
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kidbugetapp@gmail.com',
                pass: 'xrwneibpcoeiwkwe'
            }
        });

        const mailOptions = {
            from: 'kidbugetapp@gmail.com',
            to: email,
            subject: 'Welcome to the App!',
            text: `Your account has been created. Here are your login credentials:\nUsername: ${user.username}\nPassword: ${randomPassword}\n\nPlease use the following link to access the app: https://your-app-url.com`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'User created and email sent' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }

}


export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find().populate('familyNickname'); // Use populate to fetch related family details
        return res.status(200).json({ users });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { email } = req.params;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ emailExists: true });
        }

        return res.status(200).json({ emailExists: false });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {userID} = req.params
        console.log('here in id', userID)
        const user = await User.findOne({ _id: userID });
        return res.json({user})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}