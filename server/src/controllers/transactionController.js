"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.getTransactions = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here!!!!');
    try {
        const { monthYear, userID } = req.query;
        if (!userID)
            return res.status(400).json({ message: 'No userId provided' });
        const date = new Date(monthYear);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const newDate = new Date(year, month - 1, 1);
        newDate.setUTCHours(0, 0, 0, 0);
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        const endOfMonth = new Date(nextYear, nextMonth - 1, 1);
        endOfMonth.setUTCHours(0, 0, 0, 0);
        const transactions = yield Transaction_1.default.find({
            userId: userID,
            start_date: {
                $gt: newDate,
                $lte: endOfMonth,
            },
        });
        res.status(200).json({ transactions });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getTransactions = getTransactions;
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, category, description, start_date, userId, category_type } = req.body;
        console.log(amount, category, description, start_date, userId, category_type);
        const newTransaction = new Transaction_1.default({
            amount: amount,
            category: category,
            description: description,
            start_date: start_date,
            userId: userId,
            category_type: category_type
        });
        // Save the newTransactions instance to the database
        yield newTransaction.save();
        res.status(200).json({ newTransaction });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addTransaction = addTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, amount, category, description, start_date, userId, category_type } = req.body;
        // Find the transaction by ID
        const existingTransaction = yield Transaction_1.default.findById(id);
        // If the transaction with the given ID doesn't exist, return an error
        if (!existingTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // Update transaction properties
        existingTransaction.amount = amount;
        existingTransaction.category = category;
        existingTransaction.description = description;
        existingTransaction.start_date = start_date;
        existingTransaction.userId = userId;
        existingTransaction.category_type = category_type;
        // Save the updated transaction to the database
        yield Transaction_1.default.findByIdAndUpdate(id, existingTransaction);
        // Return the updated transaction
        res.status(200).json({ updatedTransaction: existingTransaction });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the transaction by ID and delete it
        const deletedTransaction = yield Transaction_1.default.findByIdAndDelete(id).lean();
        // If the transaction with the given ID doesn't exist, return an error
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // Transaction deleted successfully
        res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteTransaction = deleteTransaction;
