import * as constants from './../constants';
import * as api from './../../api';

export const signUp = (form) => async (dispatch) => {
  try {
    const response = await api.register(form);
    const email = response.data.email;
    dispatch({ type: constants.REGISTER, payload: email });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    alert('Succesfully signed-up! :)');
  } catch (error) {
    console.warn(`❌ ${error}`);
    alert('Failed to sign-up! ' + error.response.data.message);
  }
};

export const signIn = (form) => async (dispatch) => {
  try {
    const response = await api.login(form);
    const token = response.data.token;
    const firstName = response.data.firstName;
    dispatch({ type: constants.LOGIN, payload: { token, firstName } });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    alert('Login success! :)');
  } catch (error) {
    console.warn(`❌ ${error}` + error.response.data.message);
    alert('Login fail! :( ' + error.response.data.message);
  }
};

export const signOut = () => {
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
