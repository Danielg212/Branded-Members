import * as type from './../constants/actionTypes';

export const users = (state = [], action) => {
  switch (action.type) {
    case type.FETCH_ALL:
      return action.payload;
    case type.CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
};
