import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Family from "../models/Family";
import {UserDocument} from "../controllers/types";


const register = async (username: string, email: string, familyName: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newFamily = new Family({ familyName });
    await newFamily.save();

    if (!newFamily._id) {
        throw new Error('Failed to save family and retrieve its ID.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, username, familyID: newFamily._id, role: 'ADMIN' });
    await user.save();
};

const login = async (email: string, password: string) => {
    const user = await User.findOne({ email }) as UserDocument;

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
    });
    return token;
};

export default { register, login };
