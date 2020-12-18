import * as api from './../api/index';
import * as type from './../constants/actionTypes';

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await api.fetchUsers();

    console.log(`✅ ${res.status} ${res.statusText} : FETCHED USERS`);
    dispatch({ type: type.FETCH_ALL, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export const register = (form) => async (dispatch) => {
  try {
    const res = await api.register(form);

    console.log(`✅ ${res.status} ${res.statusText} : NEW USER`);
    dispatch({ type: type.REGISTER, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};
