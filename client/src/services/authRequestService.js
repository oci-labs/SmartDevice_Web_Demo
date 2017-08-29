import store from "../store";
import { SERVER_URL } from "../config";

function getCurrentUser() {
  let state = store.getState();
  return state.currentUser;
}

export function authRequest(url, method, cb) {
  let currentUser = getCurrentUser();

  if (currentUser) {
    // make request, return result
    fetch(SERVER_URL + url, {
      method: method,
      headers: {
        Authorization: "Bearer " + currentUser.access_token
      }
    })
      .then(response => response.json())
      .then(json => {
        cb(json);
      });
  } else {
    return('Unauthorized - currentUser is not set.')
  }
}