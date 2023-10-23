import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFamily extends Document {
    familyName: string;
}

const familySchema = new Schema({
    familyName: { type: String, required: true},
});

const Family: Model<IFamily> = mongoose.model<IFamily, Model<IFamily>>('Family', familySchema);

export default Family;
