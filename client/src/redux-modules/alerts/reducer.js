import { SET_ALL_ALERTS } from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ALL_ALERTS:
            return action.payload;
        default:
            return state;
    }
};
