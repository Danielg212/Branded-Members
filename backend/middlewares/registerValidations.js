import { check } from 'express-validator';
import User from '../models/UsersSchema.js';

export default [
  check(['firstName', 'lastName'], 'Must be a valid name!').exists().isAlpha(),
  check('email', 'Must be a valid email')
    .isEmail()
    .normalizeEmail()
    .custom((value) => User.find({ email: value }).then((data) => (data.length === 0 ? true : Promise.reject('Email already in use')))),
  check('password', 'Must be over 7 characters').isLength({ min: 7 }),
  check('confirmPassword').custom((value, { req }) => (value === req.body.password ? true : Promise.reject('Passwords do not match'))),
];
