import { combineReducers } from 'redux';
import { loggedUser } from './loggedUser';
import { allUsers } from './allUsers';

export default combineReducers({
  loggedUser,
  allUsers,
});
