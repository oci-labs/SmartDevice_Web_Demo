import * as types from "../actions/types";

const initialState = {
  currentDepartment: {
    id: 5,
    name: "Formulation",
    machines: [
      {
        id: 1,
        name: "Machine 1"
      },
      {
        id: 2,
        name: "Machine 2"
      }
    ]
  },
  currentManifold: {
    id: 3,
    name: "Manifold 3",
    stations: [
      { id: 1, name: "Station 1" },
      { id: 2, name: "Station 2" },
      { id: 3, name: "Station 3" },
      { id: 4, name: "Station 4" },
      { id: 5, name: "Station 5" }
    ]
  },
  currentValve: {
    id: "1",
    name: "Station 1",
    model: "100105",
    serialNum: "Some serial number"
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALL_MACHINES:
      return Object.assign({}, state, {
        machines: action.payload
      });
    case types.SET_CURRENT_VALVE:
      return Object.assign({}, state, {
        currentValve: action.payload
      });
    case types.SET_CURRENT_MANIFOLD:
      return Object.assign({}, state, {
        currentManifold: action.payload
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
