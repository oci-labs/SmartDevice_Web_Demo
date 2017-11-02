import {SET_SNOOZED_ALERTS} from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SNOOZED_ALERTS:
      return action.payload;
    default:
      return state;
  }
};
