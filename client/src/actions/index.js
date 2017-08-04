import * as types from "./types";
import * as states from "../components/common/view.config";
import { SERVER_URL } from "../config";

function GETAllAlerts(count) {
  return fetch(`${SERVER_URL}/api/alert?max=${count}`);
}

function GETItem(item) {
  console.log("GETItem");
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`);
}

function GETMachinesByDepartment(departmentId) {
  return fetch(`${SERVER_URL}/api/machine/byDepartment/${departmentId}`);
}

function toJson(response) {
  return response.json();
}

export function getFirst(items) {
  return items.reduce((a, b) => (a.id < b.id ? a : b));
}

export function setAllAlerts(alerts) {
  return {
    type: types.SET_ALL_ALERTS,
    payload: alerts
  };
}

export function throwError(error) {
  return {
    type: types.HANDLE_ERROR,
    payload: error
  };
}

export function setActiveItems(items) {
  return {
    type: types.UPDATE_ACTIVE_ITEMS,
    payload: items
  };
}

export function setSelectedItem(item, keepViewState) {
  console.log("setSelectedItem", item);
  return function(dispatch) {
    if (item) {
      GETItem(item).then(toJson).then(function(response) {
        console.log("in GETItem response", response);
        if (item.id) {
          switch (item.type) {
            case "facility":
              dispatch(setSelectedFacility(response));
              if (!keepViewState) {
                dispatch(setViewState(states.FACILITY_STATE));
              }
              dispatch(setActiveItems([response]));
              break;
            case "department":
              console.log("Switch to department");
              dispatch(setSelectedDepartment(response));
              if (!keepViewState) {
                dispatch(setSelectedItem(response.parent, true));
                dispatch(setViewState(states.DEPARTMENT_STATE));
              } else {
                GETMachinesByDepartment(item.id).then(toJson).then(response => {
                  dispatch(setActiveItems(response));
                });
              }
              break;
            case "machine":
              dispatch(setSelectedMachine(response));
              dispatch(setViewState(states.MACHINE_STATE));
              dispatch(setActiveItems([response]));
              break;
            case "manifold":
              dispatch(setSelectedManifold(response));
              dispatch(setViewState(states.MANIFOLD_STATE));
              break;
            default:
              console.log("Not handled yet", response, item.type);
          }
        } else {
          switch (item.type) {
            case "facility":
              dispatch(setSelectedFacility({}));
              dispatch(setViewState(states.FACILITY_STATE));
              dispatch(setActiveItems(response));
              break;
            case "machine":
              dispatch(setSelectedMachine({}));
              dispatch(setSelectedItem(item.parent, true));
              break;
            default:
              console.log("Not handled yet");
          }
        }
      });
    }
  };
}

function setAllFacilities(facilities) {
  return {
    type: types.SET_ALL_FACILITIES,
    payload: facilities
  };
}

export function setSelectedFacility(facility) {
  return {
    type: types.SET_SELECTED_FACILITY,
    payload: facility
  };
}

export function setSelectedDepartment(department) {
  return {
    type: types.SET_SELECTED_DEPARTMENT,
    payload: department
  };
}

export function setSelectedMachine(machine) {
  return {
    type: types.SET_SELECTED_MACHINE,
    payload: machine
  };
}

export function setSelectedManifold(manifold) {
  return {
    type: types.SET_SELECTED_MANIFOLD,
    payload: manifold
  };
}

export function setViewState(state) {
  return {
    type: types.SET_VIEW_STATE,
    payload: state
  };
}

export function getAllAlerts(count = 10) {
  return function(dispatch) {
    return GETAllAlerts(count)
      .then(toJson)
      .then(
        alerts => dispatch(setAllAlerts(alerts)),
        error => dispatch(throwError(error))
      );
  };
}
export function setSelectedStation(station) {
  return {
    type: types.SET_CURRENT_STATION,
    payload: station
  };
}

export function initialize() {
  return dispatch => {
    GETItem({ type: "facility" }).then(toJson).then(response => {
      dispatch(setActiveItems(response));
      dispatch(setAllFacilities(response));
    });
  };
}

export function toggleProfile() {
  return {
    type: types.TOGGLE_PROFILE
  };
}

export function updateAlert(alert) {
  return {
    type: types.TOGGLE_ALERT,
    payload: alert
  };
}
