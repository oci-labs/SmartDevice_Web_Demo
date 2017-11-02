import {SET_ALL_USERS} from './action-types';

export const setAllUsers = users => ({
  type: SET_ALL_USERS,
  payload: users
});
