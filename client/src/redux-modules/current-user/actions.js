
import { SET_CREDENTIALS, SET_CURRENT_USER } from './action-types';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setCredentials = credentials => ({
    type: SET_CREDENTIALS,
    payload: credentials
});
