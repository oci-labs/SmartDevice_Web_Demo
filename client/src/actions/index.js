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
  return fetch(
    `${SERVER_URL}/api/valve/station/${station.parent.id}/${station.number}`
  );
}

function GETValveBySerialNumber(valve) {
  return fetch(`${SERVER_URL}/api/valve/${valve.serialNumber}`);
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
  return fetch(`${SERVER_URL}/api/machine/department/${departmentId}`);
}

function toJson(response) {
  return response.json();
}

export function getFirst(items) {
  if (items) {
    return items.reduce((a, b) => (a.id < b.id ? a : b), {});
  } else {
    return items;
  }
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
        case "machine":
          dispatch(setSelectedItem(response, null, true));
          break;
        case "manifold":
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
  return function(dispatch, getState) {
    const state = getState();
    return DELETEItem(item).then(response => {
      switch (item.type) {
        case "facility":
          dispatch(setSelectedItem({ type: "facility" }));
          break;
        case "department":
          dispatch(setSelectedItem(state.selectedFacility));
          break;
        case "machine":
          dispatch(setSelectedItem(state.selectedDepartment));
          break;
        case "manifold":
          dispatch(setSelectedItem(state.selectedMachine));
          break;
        default:
          return null;
      }
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
        case "machine":
          dispatch(setSelectedItem(response, null, true));
          break;
        case "manifold":
          dispatch(setSelectedItem(response, null, true));
          break;
        default:
          dispatch(setSelectedItem(response));
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

export function setSelectedItem(item, keepViewState, forceRefresh) {
  return function(dispatch, getState) {
    const {
      selectedDepartment,
      selectedFacility,
      selectedMachine,
      selectedManifold,
      currentStation
    } = getState();
    if (item) {
      GETItem(item).then(toJson).then(function(response) {
        if (item.id) {
          switch (item.type) {
            case "facility":
              dispatch(setSelectedFacility(response));
              dispatch(setActiveItems([response]));
              if (!keepViewState) {
                dispatch(setViewState(states.FACILITY_STATE));
              }
              break;
            case "department":
              dispatch(setSelectedDepartment(response));
              if (
                !selectedFacility ||
                selectedFacility.id !== response.parent.id
              ) {
                dispatch(setSelectedItem(response.parent, true));
              }
              if (!keepViewState) {
                // Update the selected facility to refresh the department info
                dispatch(setViewState(states.DEPARTMENT_STATE));
                dispatch(setSelectedItem(response.parent, true));
              } else if (!forceRefresh) {
                GETMachinesByDepartment(item.id).then(toJson).then(response => {
                  dispatch(setActiveItems(response));
                });
              }
              break;
            case "machine":
              dispatch(setSelectedMachine(response));
              if (
                !selectedDepartment ||
                selectedDepartment.id !== response.parent.id ||
                forceRefresh
              ) {
                dispatch(setSelectedItem(response.parent, true, forceRefresh));
              }
              if (!keepViewState) {
                dispatch(setViewState(states.MACHINE_STATE));
              }
              dispatch(setActiveItems([response]));
              break;
            case "manifold":
              dispatch(setSelectedManifold(response));
              if (
                !selectedMachine ||
                selectedMachine.id !== response.parent.id ||
                forceRefresh
              ) {
                dispatch(setSelectedItem(response.parent, true, forceRefresh));
              }
              dispatch(setViewState(states.MANIFOLD_STATE));
              const currentStationIsChild = child => {
                return child.id === currentStation.id;
              };
              if (
                response.children.length > 0 &&
                !response.children.find(currentStationIsChild)
              ) {
                dispatch(setSelectedItem(getFirst(response.children)));
              }
              break;
            case "station":
              dispatch(setSelectedStation(response));
              if (
                !selectedManifold ||
                selectedManifold.id !== response.parent.id
              ) {
                dispatch(setSelectedItem(response.parent, true));
              }
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
              dispatch(setSelectedItem(selectedDepartment, true));
              break;
            default:
              console.log("Not handled yet - all items", item.type);
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

export function showValve(valve) {
  return dispatch => {
    if (valve) {
      return GETValveBySerialNumber(valve).then(toJson).then(response => {
        dispatch(setSelectedItem(response.station));
      });
    }
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
