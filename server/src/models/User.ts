import mongoose, { Schema } from 'mongoose';
import Flashcard, {IFlashcard} from "./Flascard";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
