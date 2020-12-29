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
  try {
    // validate inputs using express-validator
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json(validationErrors); // if validation errors exist

    // find user by email
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser)
      return res.status(400).json({ message: 'A user already exists with that email' }); // if found

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    // create new user
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save(); // save new user to collection
    sendMail(savedUser); // and send email to newly registered user

    res.status(201).json({ email: savedUser.email });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

// ----------
// LOGIN
// ----------
export const login = async (req, res, next) => {
  try {
    // validate inputs using express-validator
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) return res.status(400).json(validationErrors); // if validation errors exist

    // find user by email
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(401).json({ message: 'Wrong credentials' }); // if none found

    // decrypt password and compare
    const isPasswordOk = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isPasswordOk) return res.status(401).json({ message: 'Wrong credentials' }); // if password is not ok

    // generate token and send to client
    const token = generateToken({ userId: foundUser._id });
    res.status(200).json({ token, user: { firstName: foundUser.firstName } });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

// ----------
// GET ALL USERS
// ----------
export const getUsers = async (req, res, next) => {
  try {
    let foundUsers = await User.find().select('email firstName lastName birthDate');

    res.status(200).json(foundUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
