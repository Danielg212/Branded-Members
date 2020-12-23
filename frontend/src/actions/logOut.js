import * as type from './../constants/actionTypes';

const logOut = () => {
  console.log(`✅ : LOGGED OUT`);
  return { type: type.LOGOUT, payload: false };
};

export default logOut;
