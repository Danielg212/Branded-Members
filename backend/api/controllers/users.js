import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { genToken } from './../middlewares/jwt.js';
import { sendThankYouMail } from './../middlewares/mailer.js';

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

export const register = (req, res, next) => {
  // validate using express-validator
  const validations = validationResult(req);
  if (!validations.isEmpty()) return res.status(409).json({ errors: validations }); // if validation errors exist

  // encrypt password
  bcrypt.hash(req.body.password, 10, async (encryptError, encrypted) => {
    if (encryptError) return res.status(500).json(encryptError); // if encryption has an error

    // create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      password: encrypted,
    });

    try {
      const savedUser = await newUser.save(); // save new user to collection

      res.status(201).json({ message: 'Successfully created user', userId: savedUser._id }); // return encrypted data
      sendThankYouMail(savedUser).catch((mailError) => console.log(`❌ ${mailError}`)); // and send email to newly registered user
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
};

export const login = async (req, res, next) => {
  // validate using express-validator
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) return res.status(409).json({ errors: result }); // if validation errors exist

  try {
    const foundUser = await User.findOne({ email: req.body.email }); // find user
    if (!foundUser) return res.status(401).json({ message: 'Wrong credentials' }); // if none found

    // decrypt password and compare
    bcrypt.compare(req.body.password, foundUser.password, (decryptError, result) => {
      if (decryptError) return res.status(500).json(decryptError); // if decryption has an error
      if (!result) return res.status(401).json({ message: 'Wrong credentials' }); // if password is not ok

      res.status(200).json({ token: genToken({ email: foundUser.email, userId: foundUser._id }) });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUsers = (req, res) => {
  User.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};
