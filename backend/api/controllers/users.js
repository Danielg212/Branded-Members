import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { generateToken } from './../middlewares/jwt.js';
import { sendMail } from './../middlewares/mailer.js';

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

// ----------
// REGISTER
// ----------
export const register = async (req, res, next) => {
  // validate using express-validator
  const validations = validationResult(req);
  if (!validations.isEmpty()) return res.status(409).json({ errors: validations }); // if validation errors exist

  // encrypt password
  const salt = await bcrypt.genSalt(10).catch((err) => console.log(err) + res.status(500).send());
  const encryptedPassword = await bcrypt.hash(req.body.password, salt).catch((err) => console.log(err) + res.status(500).send());

  // create new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    email: req.body.email,
    password: encryptedPassword,
  });

  // save new user to collection
  const savedUser = await newUser.save().catch((err) => console.log(err) + res.status(500).send());

  res.status(201).json({ email: savedUser.email });
  sendMail(savedUser).catch((err) => console.log(err) + res.status(500).send()); // and send email to newly registered user
};

// ----------
// LOGIN
// ----------
export const login = async (req, res, next) => {
  // validate using express-validator
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) return res.status(409).json({ errors: result }); // if validation errors exist

  // find user
  const foundUser = await User.findOne({ email: req.body.email }).catch((err) => console.log(err) + res.status(500).json(err));
  if (!foundUser) return res.status(401).json({ message: 'Wrong credentials' }); // if none found

  // decrypt password and compare
  const result = await bcrypt.compare(req.body.password, foundUser.password).catch((err) => console.log(err) + res.status(500).send());
  if (!result) return res.status(401).json({ message: 'Wrong credentials' }); // if password is not ok

  // generate token and send to client
  const token = generateToken({ userId: foundUser._id });
  res.status(200).json({ token });
};

// ----------
// GET ALL USERS
// ----------
export const getUsers = async (req, res, next) => {
  let foundUsers = await User.find()
    .select('firstName lastName birthDate email')
    .catch((err) => console.log(err) + res.status(500).send());
  res.status(200).json(foundUsers);
};
