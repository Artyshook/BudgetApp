
export interface UserDocument extends Document {
    email: string;
    password: string;
    _id: string
    role: string
}
