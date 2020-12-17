import express from 'express';
import { createUser, getUsers } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers); // http://localhost:4000/branded-members
router.post('/register', createUser); // http://localhost:4000/branded-members/register

export default router;
