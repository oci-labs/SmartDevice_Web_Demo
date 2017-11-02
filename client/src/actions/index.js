import {setActiveItems} from '../redux-modules/active-items/actions';
import * as states from '../components/common/view.config';
import {SERVER_URL} from '../config';
import store from '../store';
import {throwError} from '../redux-modules/errors/actions';
import {
  setSelectedDepartment,
  setSelectedFacility,
  setSelectedMachine,
  setSelectedManifold,
  setSelectedStation,
  setSelectedValve
} from '../redux-modules/selected-context/actions';
import {setAllFacilities} from '../redux-modules/facilities/actions';
import {setSelectedValveStatus} from '../redux-modules/valves/actions';
import {setViewState} from '../redux-modules/view/actions';

export * from './UserActions';
export * from './AlertActions';

export function secureFetch(url, params) {
  const credentials = store.getState().currentUser.credentials;
  const token = credentials && credentials.access_token;
  let tokenHeader = {};
  if (token) {
    tokenHeader = {
      Authorization: 'Bearer ' + token
    };
  }
  const secureHeaders = Object.assign(
    {},
    params ? params.headers : {},
    tokenHeader
  );
  return fetch(
    `${SERVER_URL}${url}`,
    Object.assign({}, params, {headers: secureHeaders})
  );
}

function GETItem(item) {
  return secureFetch(`/api/${item.type}/${item.id ? item.id : ''}`);
}

function GETValve(station) {
  return secureFetch(
    `/api/valve/station/${station.parent.id}/${station.number}`
  );
}

function GETValveBySerialNumber(valve) {
  return secureFetch(`/api/valve/${valve.serialNumber}`);
}

function GETValveStatus(valve) {
  return secureFetch(`/api/valveStatus/${valve.serialNumber}`);
}

function ADDItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}`, {
    body: JSON.stringify(item),
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function DELETEItem(item, token) {
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ''}`, {
    body: JSON.stringify(item),
    method: 'delete',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function UPDATEItem(item, token) {
  console.log('The updated object is: ', item);
  return fetch(`${SERVER_URL}/api/${item.type}/${item.id ? item.id : ''}`, {
    body: JSON.stringify(item),
    method: 'put',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
}

function GETMachinesByDepartment(departmentId) {
  return secureFetch(`/api/machine/department/${departmentId}`);
}

export function toJson(response) {
  return response.status === 200 ? response.json() : response;
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
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return ADDItem(item, token)
        .then(toJson)
        .then(response => {
          switch (item.type) {
            case 'facility':
              dispatch(setSelectedItem({type: response.type}));
              break;
            case 'department':
              dispatch(setSelectedItem(response));
              break;
            case 'machine':
              dispatch(setSelectedItem(response, null, true));
              break;
            case 'manifold':
              dispatch(setSelectedItem(response));
              break;
            default:
              console.log('AddItem', response);
              break;
          }
        });
    } else {
      return dispatch(throwError('Unauthorized'));
    }
  };
}

export function deleteItem(item) {
  return function(dispatch, getState) {
    const state = getState();
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return DELETEItem(item, token).then(response => {
        switch (item.type) {
          case 'facility':
            dispatch(setSelectedItem({type: 'facility'}));
            break;
          case 'department':
            dispatch(setSelectedItem(state.selectedContext.facility));
            break;
          case 'machine':
            dispatch(setSelectedItem(state.selectedContext.department));
            break;
          case 'manifold':
            dispatch(setSelectedItem(state.selectedContext.machine));
            break;
          default:
            return null;
        }
      });
    } else {
      return dispatch(throwError('Unauthorized'));
    }
  };
}

export function updateItem(item) {
  return function(dispatch, getState) {
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return UPDATEItem(item, token)
        .then(toJson)
        .then(response => {
          switch (item.type) {
            case 'facility':
              dispatch(setSelectedItem({type: response.type}));
              break;
            case 'machine':
              dispatch(setSelectedItem(response, null, true));
              break;
            case 'manifold':
              dispatch(setSelectedItem(response, null, true));
              break;
            default:
              dispatch(setSelectedItem(response));
              break;
          }
        });
    } else {
      return dispatch(throwError('Unauthorized'));
    }
  };
}

export function setSelectedItem(item, keepViewState, forceRefresh) {
  return function(dispatch, getState) {
    const {
      selectedContext: {department, facility, machine, manifold, station},
      currentUser: {user}
    } = getState();
    if (item && user) {
      const credentials = getState().currentUser.credentials;
      const token = credentials && credentials.access_token;
      if (token) {
        GETItem(item, token)
          .then(toJson)
          .then(response => {
            if (item.id) {
              switch (item.type) {
                case 'facility':
                  dispatch(setSelectedFacility(response));
                  dispatch(setActiveItems([response]));
                  if (!keepViewState) {
                    dispatch(setViewState(states.FACILITY_STATE));
                  }
                  break;
                case 'department':
                  dispatch(setSelectedDepartment(response));
                  if (!facility || facility.id !== response.parent.id) {
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
                case 'machine':
                  dispatch(setSelectedMachine(response));
                  if (
                    !department ||
                    department.id !== response.parent.id ||
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
                case 'manifold':
                  dispatch(setSelectedManifold(response));
                  console.log('The response is: ', response);
                  if (
                    !machine ||
                    machine.id !== response.parent.id ||
                    forceRefresh
                  ) {
                    dispatch(
                      setSelectedItem(response.parent, true, forceRefresh)
                    );
                  }
                  dispatch(setViewState(states.MANIFOLD_STATE));
                  const currentStationIsChild = child =>
                    child.id === station.id;
                  if (
                    response.children.length > 0 &&
                    !response.children.find(currentStationIsChild)
                  ) {
                    dispatch(setSelectedItem(getFirst(response.children)));
                  }
                  break;
                case 'station':
                  dispatch(setSelectedStation(response));
                  if (!manifold || manifold.id !== response.parent.id) {
                    dispatch(setSelectedItem(response.parent, true));
                  }
                  dispatch(setViewState(states.MANIFOLD_STATE));
                  dispatch(setValve(response));
                  break;
                default:
                  console.log('Not handled yet', response, item.type);
              }
            } else {
              switch (item.type) {
                case 'facility':
                  dispatch(setSelectedFacility({}));
                  dispatch(setAllFacilities(response));
                  dispatch(setViewState(states.FACILITY_STATE));
                  dispatch(setActiveItems(response));
                  break;
                case 'department':
                  dispatch(setSelectedFacility(item.parent));
                  break;
                case 'machine':
                  dispatch(setSelectedMachine({}));
                  dispatch(setSelectedItem(department, true));
                  break;
                default:
                  console.log('Not handled yet - all items', item.type);
              }
            }
          });
      } else {
        return dispatch(throwError('Unauthorized'));
      }
    }
  };
}

function setValve(station) {
  return (dispatch, getState) => {
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (token) {
      return GETValve(station, token)
        .then(toJson)
        .then(response => {
          dispatch(setSelectedValve(response));
        });
    } else {
      return dispatch(throwError('Unauthorized'));
    }
  };
}

export function showValve(valve) {
  return (dispatch, getState) => {
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (valve && token) {
      return GETValveBySerialNumber(valve, token)
        .then(toJson)
        .then(response => {
          dispatch(
            setSelectedItem({type: 'station', id: response.stationNumber})
          );
        });
    } else {
      return dispatch(throwError('Unauthorized'));
    }
  };
}

export function setValveStatus(valve) {
  return (dispatch, getState) => {
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    if (valve && token) {
      return GETValveStatus(valve, token)
        .then(toJson)
        .then(response => {
          dispatch(setSelectedValveStatus(response));
        });
    }
  };
}

export function initialize() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.currentUser && state.currentUser.user) {
      GETItem(
        {
          type: 'facility'
        },
        state.currentUser.credentials.access_token
      )
        .then(toJson)
        .then(response => {
          dispatch(setActiveItems(response));
          dispatch(setAllFacilities(response));
        });
    }
  };
}
