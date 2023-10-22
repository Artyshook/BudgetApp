import { Request, Response } from 'express';
import Family from '../models/Family';

 const createFamily = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name } = req.body;
        const family = new Family({ name });
        await family.save();
        return res.status(201).json(family);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
 export {createFamily}

