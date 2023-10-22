import mongoose, {Model, Schema} from 'mongoose';


export interface IUser extends Document  {
    name: string
    email: number;
    password: string;
    role: string
    familyNickname: string
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, required: false},
    familyNickname: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
});

const User: Model<IUser> = mongoose.model<IUser, Model<IUser>>('User', userSchema);

export default User;
