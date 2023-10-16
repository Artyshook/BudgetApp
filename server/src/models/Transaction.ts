import mongoose, {Model, Schema} from "mongoose";

export interface ITransaction extends Document  {
    amount: number;
    category: string;
    description: string;
    start_date: number
    userId: number
    category_type: string
}

const TransactionSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    start_date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_type: { type: String, required: true } // You might want to define an enum for category types
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction, Model<ITransaction>>("Transaction", TransactionSchema);


export default Transaction