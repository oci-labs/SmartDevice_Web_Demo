import { toJson } from './index';
import { SERVER_URL } from '../config';
import { setAllAlerts } from '../redux-modules/alerts/actions';
import { setItemsInFault } from '../redux-modules/fault-items/actions';
import { throwError } from '../redux-modules/errors/actions';
import { setSnoozedAlerts } from '../redux-modules/snoozed-alerts/actions';

export function GETAllAlerts(count, token) {
  return fetch(`${SERVER_URL}/api/valveAlert?max=${count}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function getAlerts(count = 10) {
  return function(dispatch, getState) {
    const state = getState();
    if (state.credentials) {
      return GETAllAlerts(count, state.credentials.access_token)
        .then(toJson)
        .then(
          response => {
            if (!response.error && response.length > 1) {
              let itemsInFault = [];
              let alerts = response.map(item => {
                item.isActive = true;
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
      return "unauthenticated.";
    }
  };
}

function POSTSnoozedAlert(snoozedAlert, username, token) {
  return fetch(
    `${SERVER_URL}/api/snoozedAlert/${username}/${snoozedAlert.alertType}/${snoozedAlert.alertId}/${snoozedAlert.duration}`,
    {
      method: "post",
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );
}

export function snoozeAlert(snoozed) {
  return function(dispatch, getState) {
    const username = getState().currentUser.username;
    const token = getState().credentials.access_token;
    // const snoozedAlerts = getState().snoozedAlerts;
    POSTSnoozedAlert(snoozed, username, token)
      .then(toJson)
      .then(
        response => {
          if (!response.error) {
            // let alerts = snoozedAlerts;
            // alerts.push(response);
            // console.log(alerts);
            dispatch(getSnoozedAlerts());
          }
        },
        error => dispatch(throwError(error))
      );
  };
}

function GETSnoozedAlerts(username, token) {
  return fetch(`${SERVER_URL}/api/snoozedAlert/user/${username}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function getSnoozedAlerts() {
  return function(dispatch, getState) {
    const username = getState().currentUser.username;
    const token = getState().credentials.access_token;
    if (username) {
      return GETSnoozedAlerts(username, token)
        .then(toJson)
        .then(
          response => {
            dispatch(setSnoozedAlerts(response));
          },
          error => dispatch(throwError(error))
        );
    }
  };
}
