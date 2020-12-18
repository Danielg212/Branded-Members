import User from '../models/UsersSchema.js';
// https://restapitutorial.com/httpstatuscodes.html

export const fetchUsers = async (req, res) => {
  // this is where the data is received from the database,
  // and then given to the client side
  try {
    const allUsers = await User.find();
    console.log(`✅ -READ- :`, allUsers);
    res.status(200).json(allUsers); // found
  } catch (error) {
    console.log(`❌ ${error}`);
    res.status(404).json(error); // not found
  }
};

export const register = async (req, res) => {
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
    console.log(`✅ -CREATE- :`, newUser);
    res.status(201).json(newUser); // created
  } catch (error) {
    console.log(`❌ ${error}`);
    res.status(409).json(error); // conflict
  }
};

export const login = async (req, res) => {
  // form is recieved
  let form = req.body;

  try {
    // look for user by given credentials
    let user = await User.findOne({ email: form.email, password: form.password });
    if (user) {
      console.log(`✅ -READ- :`, user);
      res.status(200).json(user); // found
    } else {
      res.status(404).send(); // not found
    }
  } catch (error) {
    console.log(`❌ ${error}`);
    res.status(500).send(); // internal error
  }
};
