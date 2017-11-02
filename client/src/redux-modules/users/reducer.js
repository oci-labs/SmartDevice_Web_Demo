import {SET_ALL_USERS} from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
};
