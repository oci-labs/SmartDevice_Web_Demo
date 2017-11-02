import {SET_CURRENT_USER, SET_CREDENTIALS} from './action-types';

export const initialState = {
  user: null,
  credentials: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {...state, user: action.payload};
    }
    case SET_CREDENTIALS: {
      return {...state, credentials: action.payload};
    }
    default:
      return state;
  }
};
