import mongoose, {Model, Schema} from "mongoose";

export interface IBudget extends Document {
    start_date: Date;
    end_date: Date;
    amount: number;
    familyID: typeof mongoose.Schema.Types.ObjectId;
}

const budgetSchema = new Schema({
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    familyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
});

const Budget: Model<IBudget> = mongoose.model<IBudget, Model<IBudget>>('Budget', budgetSchema);

export { Budget };
