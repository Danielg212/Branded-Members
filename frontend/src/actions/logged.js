import * as api from './../api/index';
import * as type from './../constants/actionTypes';

export const login = (form) => async (dispatch) => {
  try {
    const res = await api.login(form);
    console.log(`✅ ${res.status} ${res.statusText} : LOGGED IN`);
    dispatch({ type: type.LOGIN, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export const logout = () => {
  console.log(`✅ : LOGGED OUT`);
  return { type: type.LOGOUT, payload: false };
};
