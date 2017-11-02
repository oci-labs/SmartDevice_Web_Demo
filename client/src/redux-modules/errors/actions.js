import {HANDLE_ERROR} from './action-types';

export const throwError = error => ({
  type: HANDLE_ERROR,
  payload: error
});
