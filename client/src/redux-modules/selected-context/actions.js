import {
    SET_SELECTED_DEPARTMENT, SET_SELECTED_FACILITY, SET_SELECTED_MACHINE,
    SET_SELECTED_MANIFOLD, SET_SELECTED_STATION, SET_SELECTED_VALVE
} from './action-types';

export const setSelectedFacility = facility => ({
    type: SET_SELECTED_FACILITY,
    payload: facility
});

export const setSelectedDepartment = department => ({
    type: SET_SELECTED_DEPARTMENT,
    payload: department
});

export const setSelectedMachine = machine => ({
    type: SET_SELECTED_MACHINE,
    payload: machine
});

export const setSelectedManifold = manifold => ({
    type: SET_SELECTED_MANIFOLD,
    payload: manifold
});

export const setSelectedStation = station => ({
    type: SET_SELECTED_STATION,
    payload: station
});

export const setSelectedValve = valve => ({
    type: SET_SELECTED_VALVE,
    payload: valve
});
