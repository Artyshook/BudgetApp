"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.get('/transactions', transactionController_1.getTransactions);
router.post('/transaction', transactionController_1.addTransaction);
router.put('/transaction/:id', transactionController_1.updateTransaction);
router.delete('/transaction/:id', transactionController_1.deleteTransaction);
exports.default = router;
