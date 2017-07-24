import * as types from "../actions/types";

const initialState = {
  currentValve: {
    id: "1",
    name: "Station 1",
    model: "100105",
    serialNum: "Some serial number"
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_VALVE:
      return Object.assign({}, state, {
        currentValve: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
