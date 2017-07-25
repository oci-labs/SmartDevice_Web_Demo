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

function GETItem(item) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id}`);
}

function toJson(response) {
  return response.json();
}

function getChildType(item) {
  switch (item.type) {
    case "facility":
      return "departments";
    case "department":
      return "machines";
    case "machine":
      return "manifolds";
    default:
      console.log("Shouldnt be using this", item);
      return "something";
  }
}

function getFirst(items) {
  return items.reduce(function(a, b) {
    return a.id < b.id ? a : b;
  });
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

export function setCurrentStation(station) {
  return {
    type: types.SET_CURRENT_STATION,
    payload: station
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

export function setCurrentItem(item, isManifold, currentStation) {
  return function(dispatch) {
    if (!item) {
      return GETAllFacilities()
        .then(toJson)
        .then(
          facilities => dispatch(setActiveItems(facilities)),
          error => dispatch(throwError(error))
        );
    }
    if (isManifold) {
      return GETItem(item).then(toJson).then(
        manifold => {
          if (currentStation) {
            dispatch(setCurrentStation(currentStation));
          } else {
            dispatch(setCurrentStation(getFirst(manifold.stations)));
          }
          dispatch(setCurrentManifold(manifold));
        },
        error => dispatch(throwError(error))
      );
    }
    return GETItem(item).then(toJson).then(
      item => {
        const activeItems = item[getChildType(item)];
        dispatch(setActiveItems(activeItems));
      },
      error => dispatch(throwError(error))
    );
  };
}

export function getAllFacilities() {
  return function(dispatch) {
    return GETAllFacilities()
      .then(toJson)
      .then(
        facilities => dispatch(setAllFacilities(facilities)),
        error => dispatch(throwError(error))
      );
  };
}

export function getAllMachines() {
  return function(dispatch) {
    return GETAllMachines()
      .then(toJson)
      .then(
        machines => dispatch(setAllMachines(machines)),
        error => dispatch(throwError(error))
      );
  };
}
