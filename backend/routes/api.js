import express from 'express';
import { fetchUsers } from '../controllers/fetchUsers.js';
import { register } from '../controllers/register.js';
import { login } from '../controllers/login.js';

const router = express.Router();

router.get('/users', fetchUsers);
router.post('/register', register);
router.post('/login', login);

export default router;
