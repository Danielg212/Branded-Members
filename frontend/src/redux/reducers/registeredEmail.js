import * as constants from '../constants';

export const registeredEmail = (state = '', action) => {
  switch (action.type) {
    case constants.SIGN_UP:
      return action.payload;

    case constants.SIGN_IN || constants.SIGN_OUT:
      return '';

    default:
      return state;
  }
};
