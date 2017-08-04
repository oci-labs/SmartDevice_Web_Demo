import * as types from "./types";
import * as states from "../components/common/view.config";
import { SERVER_URL } from "../config";

function GETAllAlerts(count) {
  return fetch(`${SERVER_URL}/api/alert?max=${count}`);
}

function GETItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`);
}

function GETValve(stationId) {
  return fetch(`${SERVER_URL}/api/valve/station/${stationId}`);
}

function GETValveStatus(valve) {
  return fetch(`${SERVER_URL}/api/valveStatus/${valve.serialNumber}`);
}

function DELETEItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    method: "delete"
  });
}

function UPDATEItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    body: JSON.stringify(item),
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
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

export function deleteItem(item) {
  return function(dispatch) {
    return DELETEItem(item).then(toJson).then(response => {
      console.log("Deleted response", response);
    });
  };
}

export function updateItem(item) {
  return function(dispatch) {
    return UPDATEItem(item).then(toJson).then(response => {
      switch (item.type) {
        case "facility":
          dispatch(updateAllFacilitiesWithItem(item));
          dispatch(updateActiveItemsWithItem(item));
          break;
        case "department":
          dispatch(setSelectedDepartment(item));
      }
    });
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

function updateActiveItemsWithItem(item) {
  return {
    type: types.UPDATE_ACTIVE_ITEMS_WITH_ITEM,
    payload: item
  };
}

export function setSelectedItem(item, keepViewState) {
  return function(dispatch) {
    if (item) {
      GETItem(item).then(toJson).then(function(response) {
        if (item.id) {
          switch (item.type) {
            case "facility":
              console.log("facility", response);
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
              dispatch(setSelectedItem(getFirst(response.children)));
              break;
            case "station":
              dispatch(setSelectedStation(response));
              dispatch(setValve(response.number));
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

function setValve(stationId) {
  return dispatch => {
    return GETValve(stationId).then(toJson).then(response => {
      dispatch(setSelectedValve(response));
    });
  };
}

export function setValveStatus(valve) {
  return dispatch => {
    if (valve) {
      return GETValveStatus(valve).then(toJson).then(response => {
        dispatch(setSelectedValveStatus(response));
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

function updateAllFacilitiesWithItem(item) {
  return {
    type: types.UPDATE_ALL_FACILITIES_WITH_ITEM,
    payload: item
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

export function setSelectedStation(station) {
  return {
    type: types.SET_CURRENT_STATION,
    payload: station
  };
}

export function setSelectedValve(valve) {
  return {
    type: types.SET_SELECTED_VALVE,
    payload: valve
  };
}

export function setSelectedValveStatus(valveStatus) {
  return {
    type: types.SET_VALVE_STATUS,
    payload: valveStatus
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
    return GETAllAlerts(count).then(toJson).then(
      items => {
        let alerts = items.map(item => {
          item.isSnoozed = false;
          return item;
        });
        console.log(alerts);
        dispatch(setAllAlerts(alerts));
      },
      error => dispatch(throwError(error))
    );
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

export function toggleAlerts() {
  return {
    type: types.TOGGLE_ALERTS
  };
}

export function snoozeAlert(alert) {
  return {
    type: types.SNOOZE_ALERT,
    payload: alert
  };
}
