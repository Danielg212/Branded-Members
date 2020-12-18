import { combineReducers } from 'redux';
import { users } from './users';
import { logged } from './logged';

export default combineReducers({
  users,
  logged,
});
