import { getUsers } from './../api/index';
import { FETCH_ALL } from './../constants/actionTypes';

const fetchAllUsers = () => async (dispatch) => {
  try {
    const res = await getUsers();

    console.log(`✅ ${res.status} ${res.statusText} : FETCHED USERS`);
    dispatch({ type: FETCH_ALL, payload: res.data });
  } catch (error) {
    console.warn(`❌ ${error}`);
  }
};

export default fetchAllUsers;
