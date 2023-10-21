import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFamily extends Document {
    nickname: string;
}

const familySchema = new Schema({
    nickname: { type: String, required: true, unique: true },
});

const Family: Model<IFamily> = mongoose.model<IFamily, Model<IFamily>>('Family', familySchema);

export default Family;
