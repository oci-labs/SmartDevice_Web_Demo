
import { SET_CREDENTIALS, SET_CURRENT_USER, USER_LOGOUT } from './action-types';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setCredentials = credentials => ({
    type: SET_CREDENTIALS,
    payload: credentials
});

export const userLogout = () => ({
    type:  USER_LOGOUT
});
