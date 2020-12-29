import * as constants from './../constants';
import * as api from './../../api';

export const login = (form) => async (dispatch) => {
  try {
    const response = await api.login(form);
    const token = response.data.token;
    const user = response.data.user;
    dispatch({ type: constants.LOGIN, payload: { token, user } });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    alert('Login success! :)');
  } catch (error) {
    console.warn(`❌ ${error}` + error.response.data.message);
    alert('Login fail! :( ' + error.response.data.message);
  }
};

export const logout = () => {
  return { type: constants.LOGOUT };
};

export const getUsers = (token) => async (dispatch) => {
  try {
    const response = await api.getUsers(token);
    const allUsers = response.data;
    dispatch({ type: constants.GET_USERS, payload: allUsers });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
  } catch (error) {
    console.warn(`❌ ${error}`);
    alert(error.response.data.message);
  }
};
