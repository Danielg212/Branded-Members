import * as constants from '../constants';

export const loggedUser = (
  state = {
    token: undefined,
    user: undefined,
    isLoggedIn: false,
  },
  action,
) => {
  switch (action.type) {
    case constants.REGISTER:
      return {
        ...state,
        user: { ...state.user, email: action.payload },
      };

    case constants.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: { ...state.user, firstName: action.payload.firstName },
        isLoggedIn: true,
      };

    case constants.LOGOUT:
      return { token: undefined, user: undefined, isLoggedIn: false };

    default:
      return state;
  }
};
