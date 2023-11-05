import express from 'express';
import {getUserByEmail, getUsers, getUserByID, createUser} from "../controllers/userController";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/get-user-email/:email', getUserByEmail);
router.get('/get-user/:userID', getUserByID);
router.post('/create-user', createUser)

export default router;
