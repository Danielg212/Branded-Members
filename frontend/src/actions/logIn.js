import { getUser } from './../api/index';
import { LOGIN } from './../constants/actionTypes';

const logIn = (form) => async (dispatch) => {
  try {
    const res = await getUser(form);
    console.log(`✅ ${res.status} ${res.statusText} : LOGGED IN`);
    dispatch({ type: LOGIN, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export default logIn;
