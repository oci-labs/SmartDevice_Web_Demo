import * as types from "./types";
import * as states from "../components/common/view.config";
import { SERVER_URL } from "../config";

export * from "./UserActions";
export * from "./AlertActions";



function GETItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

function GETValve(station, token) {
  return fetch(
    `${SERVER_URL}/api/valve/station/${station.parent.id}/${station.number}`,
    {
      method: "get",
      headers: {
        Authorization: "Bearer " + token
      }
    }
  );
}

function GETValveBySerialNumber(valve, token) {
  return fetch(`${SERVER_URL}/api/valve/${valve.serialNumber}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

function GETValveStatus(valve, token) {
  return fetch(`${SERVER_URL}/api/valveStatus/${valve.serialNumber}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

function ADDItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}`, {
    body: JSON.stringify(item),
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
}

function DELETEItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    body: JSON.stringify(item),
    method: "delete",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
}

function UPDATEItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ""}`, {
    body: JSON.stringify(item),
    method: "put",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
}

function GETMachinesByDepartment(departmentId, token) {
  return fetch(`${SERVER_URL}/api/machine/department/${departmentId}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function toJson(response) {
  return response.json();
}

export function getFirst(items) {
  if (items) {
    return items.reduce((a, b) => (a.id < b.id ? a : b), {});
  } else {
    return items;
  }
}


export function addItem(item) {
  return (dispatch, getState) => {
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return ADDItem(item, token)
        .then(toJson)
        .then(response => {
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
    } else {
      return dispatch(throwError("Unauthorized"));
    }
  };
}

export function deleteItem(item) {
  return function(dispatch, getState) {
    const state = getState();
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if(token) {
      return DELETEItem(item, token).then(response => {
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
    } else {
      return dispatch(throwError("Unauthorized"));
    }
  };
}

export function updateItem(item) {
  return function(dispatch, getState) {
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return UPDATEItem(item, token)
        .then(toJson)
        .then(response => {
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
    } else {
      return dispatch(throwError("Unauthorized"));
    }
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
      currentStation,
      currentUser
    } = getState();
    if (item && currentUser) {
      const credentials = getState().credentials;
      const token = credentials && credentials.access_token;
      if (token) {
        GETItem(item, token)
          .then(toJson)
          .then(function(response) {
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
                    GETMachinesByDepartment(item.id, token)
                      .then(toJson)
                      .then(response => {
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
                    dispatch(
                      setSelectedItem(response.parent, true, forceRefresh)
                    );
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
                    dispatch(
                      setSelectedItem(response.parent, true, forceRefresh)
                    );
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
                  dispatch(setViewState(states.MANIFOLD_STATE));
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
      } else {
        return dispatch(throwError("Unauthorized"));
      }
    }
  };
}

function setValve(station) {
  return (dispatch, getState) => {
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return GETValve(station, token)
        .then(toJson)
        .then(response => {
          dispatch(setSelectedValve(response));
        });
    } else {
      return dispatch(throwError("Unauthorized"));
    }
  };
}

export function showValve(valve) {
  return (dispatch, getState) => {
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if (valve && token) {
      return GETValveBySerialNumber(valve, token)
        .then(toJson)
        .then(response => {
          dispatch(
            setSelectedItem({ type: "station", id: response.stationNumber })
          );
        });
    } else {
      return dispatch(throwError("Unauthorized"));
    }
  };
}

export function setValveStatus(valve) {
  return (dispatch, getState) => {
    const credentials = getState().credentials;
    const token = credentials && credentials.access_token;
    if (valve && token) {
      return GETValveStatus(valve, token)
        .then(toJson)
        .then(response => {
          dispatch(setSelectedValveStatus(response));
        });
    } else {
      return;
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

export function initialize() {
  return (dispatch, getState) => {
    const state = getState();
    if(state.currentUser) {
      GETItem({
        type: "facility"
      }, state.credentials.access_token)
        .then(toJson)
        .then(response => {
          dispatch(setActiveItems(response));
          dispatch(setAllFacilities(response));
        });
    } else {
      return;
    }
  };
}



export function setItemsInFault(itemsInFault) {
  return {
    type: types.SET_ITEMS_IN_FAULT,
    payload: itemsInFault
  };
}
