import store from '../store';
import {SERVER_URL} from '../config';

function getCredentials() {
  let state = store.getState();
  return state.currentUser.credentials;
}

export function authRequest(url, method, cb) {
  let credentials = getCredentials();

  if (credentials) {
    // make request, return result
    fetch(SERVER_URL + url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + credentials.access_token
      }
    })
      .then(response => response.json())
      .then(json => {
        cb(json);
      });
  } else {
    return 'Unauthorized - currentUser is not set.';
  }
}
