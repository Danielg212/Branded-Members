import User from '../models/UsersSchema.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import sendThankYouMail from './../middlewares/mailer.js';

export default (req, res, next) => {
  // validate using express-validator
  const errors = validationResult(req);

  // if errors is not empty (exists)
  !errors.isEmpty()
    ? // return errors to client
      res.status(409).json(errors)
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
                .then((data) => res.status(201).json(data) + sendThankYouMail(data).catch((err) => console.log(`❌ ${err}`)))
                .catch((err) => res.status(500).json(err)) // catch save-to-db error
      );
};
