import { postUser } from '../api/index';
import { REGISTER } from '../constants/actionTypes';

const register = (form) => async (dispatch) => {
  try {
    const res = await postUser(form);

    console.log(`✅ ${res.status} ${res.statusText} : NEW USER`);
    dispatch({ type: REGISTER, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export default register;
