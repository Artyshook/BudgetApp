import express from 'express';
import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from '../controllers/transactionController';

const router = express.Router();

router.get('/transaction/get-transactions', getTransactions);
router.post('/transaction/add-transaction', addTransaction);
router.put('/transaction/update-transaction', updateTransaction);
router.delete('/transaction/delete-transaction/:id', deleteTransaction);

export default router;
