import * as types from "../actions/types";

const initialState = {
  activeItems: [],
  selectedFacility: {},
  selectedDepartment: {},
  selectedMachine: {},
  selectedManifold: {},
  selectedStation: {},
  VIEW_STATE: "state:facility",
  currentStation: {},
  valveStatus: [],
  viewProfile: true,
  viewAlerts: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALL_ALERTS:
      return Object.assign({}, state, {
        alerts: action.payload
      });
    case types.SET_ALL_FACILITIES:
      return Object.assign({}, state, {
        allFacilities: action.payload
      });
    case types.SET_ALL_MACHINES:
      return Object.assign({}, state, {
        machines: action.payload
      });
    case types.SET_CURRENT_STATION:
      return Object.assign({}, state, {
        currentStation: action.payload
      });
    case types.SET_SELECTED_FACILITY:
      return Object.assign({}, state, {
        selectedFacility: action.payload
      });
    case types.SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, {
        selectedDepartment: action.payload
      });
    case types.SET_SELECTED_MACHINE:
      return Object.assign({}, state, {
        selectedMachine: action.payload
      });
    case types.SET_SELECTED_MANIFOLD:
      return Object.assign({}, state, {
        selectedManifold: action.payload
      });
    case types.SET_SELECTED_STATION:
      return Object.assign({}, state, {
        currentStation: action.payload
      });
    case types.SET_SELECTED_VALVE:
      console.log("SETTING SELECTED VALVE", action.payload);
      return Object.assign({}, state, {
        selectedValve: action.payload
      });
    case types.SET_VALVE_STATUS:
      return Object.assign({}, state, {
        valveStatus: action.payload
      });
    case types.UPDATE_ACTIVE_ITEMS:
      return Object.assign({}, state, {
        activeItems: action.payload
      });
    case types.UPDATE_ACTIVE_ITEMS_WITH_ITEM:
      return Object.assign({}, state, {
        activeItems: state.activeItems.map(item => {
          return item.id === action.payload.id ? action.payload : item;
        })
      });
    case types.UPDATE_ALL_FACILITIES_WITH_ITEM:
      return Object.assign({}, state, {
        allFacilities: state.allFacilities.map(fac => {
          return fac.id === action.payload.id ? action.payload : fac;
        })
      });
    case types.SNOOZE_ALERT:
      let alerts = state.alerts.map(alert => {
        if (alert.id === parseInt(action.payload.props.id.match(/\d+/g))) {
          alert.isSnoozed = !alert.isSnoozed;
        }
        return alert;
      });
      console.log(alerts);
      return Object.assign({}, state, {
        alerts: alerts
      });
    case types.TOGGLE_PROFILE:
      return Object.assign({}, state, {
        viewProfile: !state.viewProfile
      });
    case types.TOGGLE_ALERTS:
      return Object.assign({}, state, {
        viewAlerts: !state.viewAlerts
      });
    case types.HANDLE_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      });
    case types.SET_VIEW_STATE:
      return Object.assign({}, state, {
        VIEW_STATE: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
