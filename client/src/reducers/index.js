import * as types from "../actions/types";

const initialState = {
  activeItems: [],
  currentStation: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALL_ALERTS:
      return Object.assign({}, state, {
        alerts: action.payload
      });
    case types.SET_ALL_FACILITIES:
      return Object.assign({}, state, {
        facilities: action.payload
      });
    case types.SET_ALL_MACHINES:
      return Object.assign({}, state, {
        machines: action.payload
      });
    case types.SET_CURRENT_STATION:
      return Object.assign({}, state, {
        currentStation: action.payload
      });
    case types.SET_CURRENT_MANIFOLD:
      return Object.assign({}, state, {
        currentManifold: action.payload
      });
    case types.UPDATE_ACTIVE_ITEMS:
      return Object.assign({}, state, {
        activeItems: action.payload
      });
    case types.HANDLE_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
