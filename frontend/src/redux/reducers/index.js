import { combineReducers } from 'redux';
import { authToken } from './authToken';
import { allUsers } from './allUsers';

export default combineReducers({
  authToken,
  allUsers,
});
