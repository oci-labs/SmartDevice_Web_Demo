import * as types from "./types";
import { toJson, throwError, setItemsInFault } from "./index";
import { SERVER_URL } from "../config";

export function GETAllAlerts(count, token) {
  return fetch(`${SERVER_URL}/api/valveAlert?max=${count}`, {
    method: 'get',
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function setAllAlerts(alerts) {
  return {
    type: types.SET_ALL_ALERTS,
    payload: alerts
  };
}

export function getAlerts(count = 10) {
  return function(dispatch, getState) {
    const state = getState();
    if (state.currentUser) {
      return GETAllAlerts(count, state.currentUser.access_token).then(toJson).then(
        response => {
          if (!response.error) {
            let itemsInFault = [];
            let alerts = response.map(item => {
              item.isActive= true;
              item.isSnoozed = false;
              itemsInFault.push(`station.${item.valve.station.id}`);
              itemsInFault.push(`manifold.${item.valve.manifold.id}`);
              itemsInFault.push(`machine.${item.valve.machine.id}`);
              itemsInFault.push(`department.${item.valve.department.id}`);
              itemsInFault.push(`facility.${item.valve.facility.id}`);
              return item;
            });
            dispatch(setAllAlerts(alerts));
            dispatch(setItemsInFault(itemsInFault));
          }
        },
        error => dispatch(throwError(error))
      );
    } else {
      return "unauthenticated."
    }
  };
}

export function toggleAlerts() {
  return {
    type: types.TOGGLE_ALERTS
  };
}

export function snoozeAlert(alert) {
  return {
    type: types.SET_SNOOZED_ALERT,
    payload: alert
  };
}