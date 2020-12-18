import express from 'express';
import { fetchUsers, register, login } from '../controllers/users.js';

const router = express.Router();

router.get('/users', fetchUsers);
router.post('/register', register);
router.post('/login', login);

export default router;
