import express from 'express';
import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from '../controllers/transactionController';

const router = express.Router();

router.get('/transactions', getTransactions);
router.post('/transaction', addTransaction);
router.put('/transaction/:id', updateTransaction);
router.delete('/transaction/:id', deleteTransaction);

export default router;
