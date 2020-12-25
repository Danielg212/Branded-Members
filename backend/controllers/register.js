import User from '../models/UsersSchema.js';
import bcrypt from 'bcrypt';
import sendThankYouMail from './../middlewares/mailer.js';

export const register = (req, res, next) =>
  User.find({ email: req.body.email }) // find existing user with email
    .exec()
    .then((data) =>
      data.length > 0 // if user already exists - send error
        ? res.status(409).json({ message: 'That email is already used' })
        : // else check if passwords are identical and encrypt password
        req.body.password === req.body.confirmPassword
        ? bcrypt.hash(
            req.body.password,
            10,
            (err, encrypted) =>
              err // if encryption threw an error - catch it
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
                    .catch((err) => res.status(500).json(err)) // catch db error
          )
        : res.status(409).json({ message: 'Passwords do not match' })
    )
    .catch((err) => console.log(err) + res.status(500).json(err)); // catch User.find error
