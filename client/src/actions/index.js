import * as types from "./types";

function getMachines() {
  return fetch("http://localhost:8080/api/machine");
}

export function setAllMachines(machines) {
  return {
    type: types.SET_ALL_MACHINES,
    payload: machines
  };
}

export function setCurrentManifold(manifold) {
  return {
    type: types.SET_CURRENT_MANIFOLD,
    payload: manifold
  };
}

export function setCurrentValve(valve) {
  return {
    type: types.SET_CURRENT_VALVE,
    payload: valve
  };
}

export function throwError(error) {
  return {
    type: types.HANDLE_ERROR,
    payload: error
  };
}

export function getAllMachines() {
  return function(dispatch) {
    return getMachines()
      .then(function(response) {
        return response.json();
      })
      .then(
        ({ machine }) => dispatch(setAllMachines(machine)),
        error => dispatch(throwError(error))
      );
  };
}
