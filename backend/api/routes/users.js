import express from 'express';
import { authenticateToken } from './../middlewares/jwt.js';
import { signUpValidations, signInValidations } from '../middlewares/validations.js';
import { register, login, getUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/register', signUpValidations, register);
router.post('/login', signInValidations, login);
router.get('/', authenticateToken, getUsers);

export default router;
