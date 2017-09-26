import { SET_ACTIVE_ITEMS, UPDATE_ACTIVE_ITEM } from './action-types';

export const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTIVE_ITEMS: {
            return action.payload;
        }
        case UPDATE_ACTIVE_ITEM: {
            return state.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            });
        }
        default:
            return state;
    }
};
