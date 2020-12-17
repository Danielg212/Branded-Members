import * as api from './../api/index';
import * as type from './../constants/actionTypes';

export const getUsers = () => async (dispatch) => {
  try {
    const response = await api.fetchUsers();
    console.log(`✅ ${response.status} ${response.statusText} : FETCHED USERS`);
    dispatch({ type: type.FETCH_ALL, payload: response.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export const createUser = (form) => async (dispatch) => {
  try {
    const response = await api.addUser(form);
    console.log(`✅ ${response.status} ${response.statusText} : UPLOADED NEW USER`);
    dispatch({ type: type.CREATE, payload: response.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};
