import * as types from "./types";

export function setCurrentValve(valve) {
  return {
    type: types.SET_CURRENT_VALVE,
    payload: valve
  };
}
