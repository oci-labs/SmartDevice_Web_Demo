import * as types from "./types";
import { toJson, throwError, initialize } from "./index";
import { getAlerts } from "./AlertActions"
import { SERVER_URL } from "../config";


function GETUserObj(username, token) {
  return fetch(`${SERVER_URL}/api/user/username/${username}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

function POSTUserAuth(username, password) {
  return fetch(`${SERVER_URL}/api/login`, {
    body:JSON.stringify({username: username, password: password}),
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
}


export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    payload: user
  }
}
export function getCurrentUser(credentials) {
  const {access_token, username} = credentials;
  return function(dispatch) {
    return GETUserObj(username, access_token).then(toJson).then(
      response => {
        if(!response.error) {
          dispatch(setCurrentUser(response));
          dispatch(getAlerts(30));
          dispatch(initialize());

        }
      }
    )
  }
}

export function postUserAuth(username, password) {
  return function(dispatch) {
    return POSTUserAuth(username, password).then(toJson).then(
      response => {
        if(!response.error) {

          dispatch(setCredentials(response));
          dispatch(getCurrentUser(response));
        }
      },
      error => dispatch(throwError(error))
    )
  }
}

export function setCredentials(credentials) {
  return {
    type: types.SET_CREDENTIALS,
    payload: credentials
  }
}

export function toggleProfile() {
  return {
    type: types.TOGGLE_PROFILE
  };
}