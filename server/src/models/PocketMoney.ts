import mongoose, {Model, Schema} from "mongoose";

export interface IPocketMoney extends Document {
    amount: number;
    start_date: Date;
    end_date: Date;
    userId: typeof mongoose.Schema.Types.ObjectId;
}

const pocketMoneySchema = new Schema({
    amount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const PocketMoney: Model<IPocketMoney> = mongoose.model<IPocketMoney, Model<IPocketMoney>>('PocketMoney', pocketMoneySchema);

export default PocketMoney