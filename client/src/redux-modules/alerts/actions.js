import {SET_ALL_ALERTS} from './action-types';

export const setAllAlerts = alerts => ({
  type: SET_ALL_ALERTS,
  payload: alerts
});
