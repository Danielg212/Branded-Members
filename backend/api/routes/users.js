import express from 'express';
import { authenticateToken } from './../middlewares/jwt.js';
import { signUpValidations, signInValidations } from '../middlewares/validations.js';
import { signUp, signIn, getUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signUpValidations, signUp);
router.post('/signin', signInValidations, signIn);
router.get('/', authenticateToken, getUsers);

export default router;
