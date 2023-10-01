import mongoose, { Schema, Document } from 'mongoose';

export interface IFlashcard extends Document {
    word: string;
    definition: string;
    category: string;
    // You can add more fields as per your requirements
}

const FlashcardSchema: Schema = new Schema({
    word: { type: String, required: true },
    definition: { type: String, required: true },
    category: { type: String, required: true },
    // You can add more fields here
});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;
