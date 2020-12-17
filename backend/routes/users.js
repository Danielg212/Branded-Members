import express from 'express';
import { createUser, getUsers } from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers); // http://localhost:4000/branded-members/users
router.post('/users', createUser); // http://localhost:4000/branded-members/users

export default router;
