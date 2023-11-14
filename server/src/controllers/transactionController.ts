    import Transaction, {ITransaction} from "../models/Transaction";
    import {Request, Response} from "express";


    const getTransactions = async (req: Request, res: Response) => {
        console.log('here: ID')
        try {
            const { monthYear, userID } = req.query;
            console.log(userID)
            if(!userID) return res.status(400).json({ message: 'No userId provided' });

            const date = new Date(monthYear as string);
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            const newDate = new Date(year, month - 1, 1);
            newDate.setUTCHours(0, 0, 0, 0);


            const nextMonth = month === 12 ? 1 : month + 1;
            const nextYear = month === 12 ? year + 1 : year;
            const endOfMonth = new Date(nextYear, nextMonth - 1, 1);
            endOfMonth.setUTCHours(0, 0, 0, 0);

            const transactions = await Transaction.find({
                userId: userID as string,
                start_date: {
                    $gt: newDate,
                    $lte: endOfMonth,
                },
            });

            res.status(200).json({ transactions});

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const addTransaction = async (req: Request, res: Response) => {
        try {
            const { amount, category, description, start_date, userId,category_type} = req.body;
            console.log(amount, category, description, start_date, userId,category_type)
            const newTransaction = new Transaction({
                amount: amount,
                category: category,
                description: description,
                start_date: start_date,
                userId: userId,
                category_type: category_type
            });

            // Save the newTransactions instance to the database
            await newTransaction.save();
            res.status(200).json({ newTransaction });
        } catch (error){
            res.status(500).json({ error: 'Internal Server Error' });

        }
    };

    const updateTransaction = async (req: Request, res: Response) => {
        try {
            const { id, amount, category, description, start_date, userId, category_type } = req.body;

            // Find the transaction by ID
            const existingTransaction = await Transaction.findById(id) as ITransaction;

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
            await Transaction.findByIdAndUpdate(id, existingTransaction);

            // Return the updated transaction
            res.status(200).json({ updatedTransaction: existingTransaction });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const deleteTransaction = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            // Find the transaction by ID and delete it
            const deletedTransaction = await Transaction.findByIdAndDelete(id).lean();

            // If the transaction with the given ID doesn't exist, return an error
            if (!deletedTransaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }

            // Transaction deleted successfully
            res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };


        export {getTransactions,addTransaction, updateTransaction, deleteTransaction}