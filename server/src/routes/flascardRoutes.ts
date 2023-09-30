import express from 'express';
import {
    getAllFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
} from '../controllers/flashcardController';

const router = express.Router();

router.get('/flashcards', getAllFlashcards);
router.post('/flashcards', createFlashcard);
router.put('/flashcards/:id', updateFlashcard);
router.delete('/flashcards/:id', deleteFlashcard);

export default router;
