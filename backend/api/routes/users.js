import express from 'express';
import { checkAuth } from './../middlewares/jwt.js';
import { registerValidations, loginValidations } from '../utils/validations.js';
import { register, login, getUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerValidations, register);
router.post('/login', loginValidations, login);
router.get('/', checkAuth, getUsers);

export default router;
