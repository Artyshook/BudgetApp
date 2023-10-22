import { Request, Response } from 'express';
import {Budget, IBudget} from "../models/Budget";

export const getBudgets = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { familyID } = req.query;

        if(!familyID) return res.status(400).json({ message: 'No familyID provided' });

        const budgets = await Budget.find({ familyID: familyID as string });

        return res.status(200).json({ budgets });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addBudget = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { start_date, end_date, amount, familyID } = req.body;

        const newBudget = new Budget({
            start_date,
            end_date,
            amount,
            familyID
        });

        await newBudget.save();

        return res.status(201).json({ newBudget });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateBudget = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id, start_date, end_date, amount, familyID } = req.body;

        const existingBudget = await Budget.findById(id) as IBudget;

        if (!existingBudget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        existingBudget.start_date = start_date;
        existingBudget.end_date = end_date;
        existingBudget.amount = amount;
        existingBudget.familyID = familyID;

        await Budget.findByIdAndUpdate(id, existingBudget);

        return res.status(200).json({ updatedBudget: existingBudget });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteBudget = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        return res.status(200).json({ message: 'Budget deleted successfully', deletedBudget });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

