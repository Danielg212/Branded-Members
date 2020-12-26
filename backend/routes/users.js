import express from 'express';
import { registerValidations } from '../middlewares/validations.js';
import { register, login, getUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerValidations, register);
router.post('/login', login);
router.get('/', getUsers);

export default router;
