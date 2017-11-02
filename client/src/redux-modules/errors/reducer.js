import {HANDLE_ERROR} from './action-types';

export const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ERROR:
      return action.payload;
    default:
      return state;
  }
};
