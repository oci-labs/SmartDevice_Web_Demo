
import { SET_VALVE_STATUS } from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_VALVE_STATUS:
            return action.payload;
        default:
            return state;
    }
};
