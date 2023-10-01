import { Request, Response } from 'express';
import Flashcard, { IFlashcard } from '../models/Flascard';

const getAllFlashcards = async (req: Request, res: Response): Promise<void> => {
    try {
        const flashcards: IFlashcard[] = await Flashcard.find();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createFlashcard = async (req: Request, res: Response): Promise<void> => {
    const { word, definition, category } = req.body;

    try {
        const newFlashcard: IFlashcard = new Flashcard({ word, definition, category });
        await newFlashcard.save();
        res.status(201).json(newFlashcard);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateFlashcard = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { word, definition, category } = req.body;

    try {
        const updatedFlashcard: IFlashcard | null = await Flashcard.findByIdAndUpdate(
            id,
            { word, definition, category },
            { new: true }
        );

        if (updatedFlashcard) {
            res.json(updatedFlashcard);
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteFlashcard = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedFlashcard: IFlashcard | null = await Flashcard.findByIdAndDelete(id);

        if (deletedFlashcard) {
            res.json({ message: 'Flashcard deleted successfully' });
        } else {
            res.status(404).json({ error: 'Flashcard not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { getAllFlashcards, createFlashcard, updateFlashcard, deleteFlashcard };
