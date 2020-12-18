import * as type from '../constants/actionTypes';

export const logged = (state = false, action) => {
  switch (action.type) {
    case type.LOGIN:
      return action.payload;

    default:
      return state;
  }
};
