import { check } from 'express-validator';

export const signUpValidations = [
  check(['firstName', 'lastName'], 'Name is not valid')
    .exists()
    .matches(/^[a-z ,.'-]+$/i),
  check('email', 'Email is not valid').exists().isEmail().normalizeEmail(),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
  check('confirmPassword')
    .exists()
    .custom((value, { req }) =>
      value === req.body.password ? true : Promise.reject('Passwords do not match'),
    ),
  check('birthDate').exists(),
];

export const signInValidations = [
  check('email', 'Email is not valid').exists().isEmail().normalizeEmail(),
  check('password', 'Password must be over 7 characters').exists().isLength({ min: 7 }),
];
