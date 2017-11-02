import {SET_ALL_FACILITIES} from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_FACILITIES:
      return action.payload;
    default:
      return state;
  }
};
