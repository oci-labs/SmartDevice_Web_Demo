import {SET_SNOOZED_ALERTS} from './action-types';

export const setSnoozedAlerts = alerts => ({
  type: SET_SNOOZED_ALERTS,
  payload: alerts
});
