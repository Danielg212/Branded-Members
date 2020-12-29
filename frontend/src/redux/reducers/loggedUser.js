import * as constants from '../constants';

export const loggedUser = (
  state = {
    token: undefined,
    user: undefined,
  },
  action,
) => {
  switch (action.type) {
    case constants.LOGIN:
      return { ...state, token: action.payload.token, user: action.payload.user };

    case constants.LOGOUT:
      return { ...state, token: undefined, user: undefined };

    default:
      return state;
  }
};
