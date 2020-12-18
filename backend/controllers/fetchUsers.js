import User from '../models/UsersSchema.js';

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
