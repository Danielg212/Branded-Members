import mongoose from 'mongoose';

const instance = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: Date,
  creationDate: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('User', instance);
