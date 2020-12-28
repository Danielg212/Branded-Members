import * as constants from './../constants';
import * as api from './../../api';

export const signUp = (form) => async (dispatch) => {
  try {
    const response = await api.signUp(form);
    const email = response.data.email;
    dispatch({ type: constants.SIGN_UP, payload: email });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    window.alert('Succesfully signed-up! :)');
  } catch (error) {
    console.warn(`❌ ${error}`);
    window.alert('Failed to signed-up! :(');
  }
};

export const signIn = (form) => async (dispatch) => {
  try {
    const response = await api.signIn(form);
    const token = response.data.token;
    dispatch({ type: constants.SIGN_IN, payload: token });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
    window.alert('Succesfully signed-in! :)');
  } catch (error) {
    console.warn(`❌ ${error}`);
    window.alert('Failed to signed-in! :(');
  }
};

export const signOut = () => {
  return { type: constants.SIGN_OUT };
};

export const getUsers = (token) => async (dispatch) => {
  try {
    const response = await api.getUsers(token);
    const allUsers = response.data;
    dispatch({ type: constants.GET_USERS, payload: allUsers });

    console.log(`✅ ${response.status} ${response.statusText}`, response.data);
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};
