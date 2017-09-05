import * as types from "./types";
import { toJson, throwError, initialize } from "./index";
import { getAlerts } from "./AlertActions"
import { SERVER_URL } from "../config";


function GETUserObj(username, token) {
  return fetch(`${SERVER_URL}/api/user?username=${username}`, {
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


export function postCurrentUser(username, password) {
  return function(dispatch) {
    return POSTUserAuth(username, password).then(toJson).then(
      response => {
        if(!response.error) {
          let user = response;
          GETUserObj(username, response.access_token).then(toJson).then(
            response => {
              user.id = response[0].id;
              console.log(user);
              dispatch(setCurrentUser(user));
              dispatch(getAlerts(30));
              dispatch(initialize());
            }
          )
        }
      },
      error => dispatch(throwError(error))
    );
  };
};

export function toggleProfile() {
  return {
    type: types.TOGGLE_PROFILE
  };
}