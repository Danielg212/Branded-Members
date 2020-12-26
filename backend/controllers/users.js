import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { genToken } from './../middlewares/jwt.js';
import { sendThankYouMail } from './../middlewares/mailer.js';

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

export const register = (req, res, next) => {
  // validate using express-validator
  const result = validationResult(req);

  // if errors is not empty (exists)
  !result.isEmpty()
    ? // return errors to client
      res.status(409).json({ errors: result })
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
                // then, return encrypted data,
                .then(
                  (data) =>
                    res.status(201).json({ message: 'Successfully created user', userId: data._id }) +
                    // and send email to newly registered user
                    sendThankYouMail(data).catch((err) => console.log(`❌ ${err}`))
                )
                .catch((err) => res.status(500).json({ message: err })) // catch save-to-db error
      );
};

export const login = (req, res, next) => {
  // validate using express-validator
  const validationErrors = validationResult(req);

  // if errors is not empty (exists)
  !validationErrors.isEmpty()
    ? // return errors to client
      res.status(409).json({ errors: result })
    : // else find user
      User.findOne({ email: req.body.email })
        .then((data) =>
          !data // if none found return 401
            ? res.status(401).json({ message: 'Wrong credentials' })
            : // else decrypt password and compare
              bcrypt.compare(req.body.password, data.password, (error, result) =>
                error // if bcrypt error return 500
                  ? res.status(500).json(error)
                  : result // else, if result is password ok return token
                  ? res.status(200).json({ token: genToken({ email: data.email, userId: data._id }) })
                  : // else return 401
                    res.status(401).json({ message: 'Wrong credentials' })
              )
        )
        .catch((err) => res.status(500).json({ message: err })); // catch find-db error
};

export const getUsers = (req, res) => {
  User.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
};
