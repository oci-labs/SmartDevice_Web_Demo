import * as types from "./types";
import { SERVER_URL } from "../config";

function GETAllFacilities() {
  return fetch(`${SERVER_URL}/api/facility`);
}

function GETFacility({ id }) {
  return fetch(`${SERVER_URL}/api/facility/${id}`);
}

function GETAllDepartments() {
  return fetch(`${SERVER_URL}/api/department`);
}

function GETDepartment({ id }) {
  return fetch(`${SERVER_URL}/api/department/${id}`);
}

function GETAllMachines() {
  return fetch(`${SERVER_URL}api/machine`);
}

function toJson(response) {
  console.log(`toJson ${response}`);
  return response.json();
}

export function setAllFacilities(facilities) {
  return {
    type: types.SET_ALL_FACILITIES,
    payload: facilities
  };
}

export function setAllDepartments(departments) {
  return {
    type: types.SET_ALL_DEPARTMENTS,
    payload: departments
  };
}

export function setAllMachines(machines) {
  console.log("setAllMachines");
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

export function getAllFacilities() {
  return function(dispatch) {
    return GETAllFacilities()
      .then(toJson)
      .then(
        ({ facility }) => dispatch(setAllFacilities(facility)),
        error => dispatch(throwError(error))
      );
  };
}

export function getAllMachines() {
  return function(dispatch) {
    return GETAllMachines().then(toJson).then(
      ({ machine }) => {
        console.log("Past toJson");
        dispatch(setAllMachines(machine));
      },
      error => dispatch(throwError(error))
    );
  };
}
