import express from 'express';
import {getUserByEmail, getUsers} from "../controllers/userController";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/get-user-email/:email', getUserByEmail);


export default router;
