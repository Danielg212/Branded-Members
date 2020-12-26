import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { sendThankYouMail } from './../middlewares/mailer.js';

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

export const register = (req, res, next) => {
  // validate using express-validator
  const result = validationResult(req);

  // if errors is not empty (exists)
  !result.isEmpty()
    ? // return errors to client
      console.log(result) + res.status(409).json({ errors: result })
    : // else encrypt password
      bcrypt.hash(
        req.body.password, // original password
        10, // salts
        (err, encrypted) =>
          err // catch encryption error
            ? res.status(500).json(err)
            : // else create new user
              new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                email: req.body.email,
                password: encrypted,
              })
                .save() // save it to collection
                // then, return encrypted data, and send email to newly registered user
                .then((data) => res.status(201).json({ message: 'Successfully created user', userId: data._id }) + sendThankYouMail(data).catch((err) => console.log(`❌ ${err}`)))
                .catch((err) => res.status(500).json({ message: err })) // catch save-to-db error
      );
};

export const login = (req, res) => {};

export const getUsers = (req, res) => {};
