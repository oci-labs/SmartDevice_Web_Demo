import { toJson, secureFetch, initialize } from './index';
import { getAlerts, unsnoozeAlerts, getSnoozedAlerts } from './AlertActions';
import { SERVER_URL } from '../config';
import { setCredentials, setCurrentUser, userLogout } from '../redux-modules/current-user/actions';
import { setAllUsers } from '../redux-modules/users/actions';
import { throwError } from '../redux-modules/errors/actions';

function GETUserObj(username, token) {
  return fetch(`${SERVER_URL}/api/user/username/${username}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
}

function GETUsers(token) {
  return fetch(`${SERVER_URL}/api/user/withRoles`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

function POSTUserAuth(username, password) {
  return fetch(`${SERVER_URL}/api/login`, {
    body: JSON.stringify({ username: username, password: password }),
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

function POSTNewUser(user) {
  return secureFetch(`/api/user`, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

function DELETEUser(user) {
  return secureFetch(`/api/user/${user.id}`, {
    method: "delete"
  });
}

function PUTUser(user) {
  return secureFetch(`/api/user/update`, {
    method: "put",
    body: JSON.stringify(user)
  });
}

export function getCurrentUser(credentials) {
  const { access_token, username } = credentials;
  return function(dispatch) {
    return GETUserObj(username, access_token)
      .then(toJson)
      .then(response => {
        if (!response.error) {
          dispatch(setCurrentUser(response));
          dispatch(getAlerts(30));
          dispatch(initialize());
          dispatch(unsnoozeAlerts());
          dispatch(getSnoozedAlerts());
        }
      });
  };
}

export function getAllUsers() {
  return (dispatch, getState) => {
    const credentials = getState().currentUser.credentials;
    const token = credentials && credentials.access_token;
    return GETUsers(token)
      .then(toJson)
      .then(response => {
        dispatch(setAllUsers(response));
      });
  };
}

export function addNewUser(user) {
  return dispatch => {
    return POSTNewUser(user)
      .then(toJson)
      .then(response => {
        console.log("User added", response);
        dispatch(getAllUsers());
      });
  };
}

export function deleteUser(user) {
  console.log("The delete user is: ", user);
  return dispatch => {
    return DELETEUser(user)
      .then(toJson)
      .then(response => {
        console.log("User deleted", response);
        dispatch(getAllUsers());
      });
  };
}

export function editUser(user) {
  console.log("User is : ", user);
  return dispatch => {
    return PUTUser(user)
      .then(toJson)
      .then(response => {
        console.log("User edited", response);
        dispatch(getAllUsers());
      });
  };
}

export function postUserAuth(username, password) {
  return function(dispatch) {
    return POSTUserAuth(username, password)
      .then(toJson)
      .then(
        response => {
          if(response.error || (response.status && response.status !== 200)) {
              dispatch(userLogout);
          } else {
            console.log("The response is: ", response);
            dispatch(setCredentials(response));
            dispatch(getCurrentUser(response));
          }
        },
        error => {
          console.log("Error encountered logging in, ", error);
          dispatch(throwError(error));
          dispatch(userLogout);
        }
      );
  };
}
