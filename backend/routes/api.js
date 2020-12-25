import express from 'express';
import { register } from '../controllers/register.js';
import registerValidations from './../middlewares/registerValidations.js';
import { login } from '../controllers/login.js';
import { fetchUsers } from '../controllers/fetchUsers.js';

const router = express.Router();

router.post('/register', registerValidations, register);
router.post('/login', login);
router.get('/users', fetchUsers);

export default router;
