import { check } from 'express-validator';
import User from '../models/User.js';

export const registerValidations = [
  check(['firstName', 'lastName'], 'Name is not a valid name').exists().isAlpha(),
  check('email', 'Email is not a valid email')
    .exists()
    .isEmail()
    .normalizeEmail()
    .custom((value) => User.find({ email: value }).then((data) => (data.length === 0 ? true : Promise.reject('Email already in use')))),
  check('password', 'Must be over 7 characters').exists().isLength({ min: 7 }),
  check('confirmPassword')
    .exists()
    .custom((value, { req }) => (value === req.body.password ? true : Promise.reject('Passwords do not match'))),
  // check('birthDate').exists(),
];

export const loginValidations = [
  check('email', 'Email is not a valid email').exists().isEmail().normalizeEmail(),
  check('password', 'Must be over 7 characters').exists().isLength({ min: 7 }),
];
