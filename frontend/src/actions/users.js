import * as api from './../api/index';

export const getUsers = () => async (dispatch) => {
  try {
    const response = await api.fetchUsers();
    console.log(`✅ ${response.status} ${response.statusText} : FETCHED USERS`);
    dispatch({ type: 'FETCH_ALL', payload: response.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export const createUser = (form) => async (dispatch) => {
  try {
    const response = await api.addUser(form);
    console.log(`✅ ${response.status} ${response.statusText} : UPLOADED NEW USER`);
    dispatch({ type: 'CREATE', payload: response.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};
