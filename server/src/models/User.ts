import mongoose, {Model, Schema} from 'mongoose';


export interface IUser extends Document  {
    username: string
    email: number;
    password: string;
    role?: 'ADMIN' | 'USER';
    familyID : object
}

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, required: false},
    familyID : { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
});

const User: Model<IUser> = mongoose.model<IUser, Model<IUser>>('User', userSchema);

export default User;
