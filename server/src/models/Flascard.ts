import mongoose, { Schema, Document } from 'mongoose';

export interface IFlashcard extends Document {
    word: string;
    definition: string;
    category: string;
}

const FlashcardSchema: Schema = new Schema({
    word: { type: String, required: true },
    definition: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;
