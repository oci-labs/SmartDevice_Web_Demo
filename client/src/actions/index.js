import * as types from "./types";
import * as states from "../components/common/view.config";
import { SERVER_URL } from "../config";

function GETAllAlerts(count) {
  return fetch(`${SERVER_URL}/api/valveAlert?max=${count}`);
}

function GETItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`);
}

function GETValve(station) {
  let url = new URL(`${SERVER_URL}/api/valve/station/${station.parent.id}/${station.number}`);

  return fetch(url);
}

function GETValveStatus(valve) {
  return fetch(`${SERVER_URL}/api/valveStatus/${valve.serialNumber}`);
}

function ADDItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}`, {
    body: JSON.stringify(item),
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

function DELETEItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    body: JSON.stringify(item),
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
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

export function addItem(item) {
  return function(dispatch) {
    return ADDItem(item).then(toJson).then(response => {
      switch (item.type) {
        case "facility":
          dispatch(setSelectedItem({ type: response.type }));
          break;
        case "department":
          dispatch(setSelectedItem(response));
          break;
        default:
          console.log("AddItem", response);
          break;
      }
    });
  };
}

export function deleteItem(item) {
  return function(dispatch) {
    return DELETEItem(item).then(response => {
      dispatch(
        setSelectedItem(item.parent ? item.parent : { type: item.type })
      );
    });
  };
}

export function updateItem(item) {
  return function(dispatch) {
    return UPDATEItem(item).then(toJson).then(response => {
      switch (item.type) {
        case "facility":
          dispatch(setSelectedItem({ type: response.type }));
          break;
        case "department":
          dispatch(setSelectedDepartment(item));
          break;
        default:
          break;
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
              dispatch(setSelectedFacility(response));
              if (!keepViewState) {
                dispatch(setViewState(states.FACILITY_STATE));
              }
              dispatch(setActiveItems([response]));
              break;
            case "department":
              dispatch(setSelectedDepartment(response));
              if (!keepViewState) {
                // Update the selected facility to refresh the department info
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
              // Update selected department to refresh machine info
              dispatch(setSelectedItem(response.parent, true));
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
              dispatch(setValve(response));
              break;
            default:
              console.log("Not handled yet", response, item.type);
          }
        } else {
          switch (item.type) {
            case "facility":
              dispatch(setSelectedFacility({}));
              dispatch(setAllFacilities(response));
              dispatch(setViewState(states.FACILITY_STATE));
              dispatch(setActiveItems(response));
              break;
            case "department":
              dispatch(setSelectedFacility(item.parent));
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

function setValve(station) {
  return dispatch => {
    return GETValve(station).then(toJson).then(response => {
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
      response => {
        if (response.error !== 404) {
          let alerts = response.map(item => {
            item.isSnoozed = false;
            item.isActive = true;
            return item;
          });
          dispatch(setAllAlerts(alerts));
        }
      },
      error => dispatch(throwError(error))
    );
  };
}

export function initialize() {
  return dispatch => {
    GETItem({
      type: "facility"
    })
      .then(toJson)
      .then(response => {
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
