import * as constants from './../constants';

export const authToken = (state = '', action) => {
  switch (action.type) {
    case constants.SIGN_IN:
      return action.payload;

    case constants.SIGN_OUT:
      return '';

    default:
      return state;
  }
};
