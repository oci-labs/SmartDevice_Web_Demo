import {SET_ITEMS_IN_FAULT} from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS_IN_FAULT: {
      return action.payload;
    }
    default:
      return state;
  }
};
