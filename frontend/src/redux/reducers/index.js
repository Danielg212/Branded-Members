import { combineReducers } from 'redux';
import { authToken } from './authToken';
import { allUsers } from './allUsers';
import { registeredEmail } from './registeredEmail';

export default combineReducers({
  authToken,
  allUsers,
  registeredEmail,
});
