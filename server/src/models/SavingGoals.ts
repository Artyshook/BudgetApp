import mongoose, {Model, Schema} from "mongoose";

export interface ISavingGoals extends Document {
    start_date: Date;
    goalAmount: number;
    currentAmount: number;
    isActive: boolean;
    userId: typeof mongoose.Schema.Types.ObjectId;
}

const savingGoalsSchema = new Schema({
    start_date: { type: Date, required: true },
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const SavingGoals: Model<ISavingGoals> = mongoose.model<ISavingGoals, Model<ISavingGoals>>('SavingGoals', savingGoalsSchema);

export default SavingGoals;
