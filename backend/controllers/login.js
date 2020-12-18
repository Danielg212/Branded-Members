import User from '../models/UsersSchema.js';

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
