import { SET_VALVE_STATUS } from './action-types';

export const setSelectedValveStatus = valveStatus => ({
    type: SET_VALVE_STATUS,
    payload: valveStatus
});
