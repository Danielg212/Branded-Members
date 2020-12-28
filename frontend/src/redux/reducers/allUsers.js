import * as constants from './../constants';

export const allUsers = (state = [], action) => {
  switch (action.type) {
    case constants.GET_USERS:
      return action.payload;

    case constants.SIGN_OUT:
      return [];

    default:
      return state;
  }
};
