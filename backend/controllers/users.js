import User from '../models/UsersSchema.js';

export const getUsers = async (req, res) => {
  // this is where the data is received from the database,
  // and then given to the client side
  try {
    const allUsers = await User.find();
    console.log(`✅ -FOUND- MongoDB:`, allUsers);
    res.status(200).json(allUsers); // respond with data
  } catch (error) {
    console.warn(`❌ ${error}`);
    res.status(404).json({ message: error.message }); // respond with error
  }
};

export const createUser = async (req, res) => {
  // this is where the data is received from the user,
  // and then constructed with a mongoose schema
  // and then saved to the database
  const form = req.body;
  const newUser = new User({
    firstName: form.firstName,
    lastName: form.lastName,
    birthDate: form.birthDate,
    email: form.email,
    password: form.password,
  });
  try {
    await newUser.save();
    console.log(`✅ -SAVED- MongoDB:`, newUser);
    res.status(201).json(newUser); // respond with success
  } catch (error) {
    console.warn(`❌ ${error}`);
    res.status(409).json({ message: error.message }); // respond with error
  }
};
