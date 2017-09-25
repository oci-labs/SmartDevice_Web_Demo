import {
    SET_SELECTED_DEPARTMENT, SET_SELECTED_FACILITY, SET_SELECTED_MACHINE,
    SET_SELECTED_MANIFOLD, SET_SELECTED_STATION, SET_SELECTED_VALVE
} from './action-types';

export const initialState = {
    facility: {},
    department: {},
    machine: {},
    manifold: {},
    station: {},
    valve: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_SELECTED_FACILITY: {
            return { ...state, facility: action.payload };
        }
        case SET_SELECTED_DEPARTMENT: {
            return { ...state, department: action.payload };
        }
        case SET_SELECTED_MACHINE: {
            return { ...state, machine: action.payload };
        }
        case SET_SELECTED_MANIFOLD: {
            return { ...state, manifold: action.payload };
        }
        case SET_SELECTED_STATION: {
            return { ...state, station: action.payload };
        }
        case SET_SELECTED_VALVE: {
            return { ...state, valve: action.payload };
        }
        default:
            return state;
    }
};
