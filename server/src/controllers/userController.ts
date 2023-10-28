import { Request, Response } from 'express';
import User from '../models/User';

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