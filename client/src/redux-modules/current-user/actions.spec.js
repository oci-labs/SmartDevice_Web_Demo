/* global describe, it, expect */

import {SET_CREDENTIALS, SET_CURRENT_USER} from './action-types';
import {setCredentials, setCurrentUser} from './actions';
import randomize from 'randomatic';

describe('Current user action creators', () => {
  it('setCredentials should create the expected action', () => {
    const testItem = randomize('*', 10);
    const expectedAction = {
      type: SET_CREDENTIALS,
      payload: testItem
    };

    expect(setCredentials(testItem)).toEqual(expectedAction);
  });

  it('setCurrentUser should create the expected action', () => {
    const testItem = randomize('*', 10);
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload: testItem
    };

    expect(setCurrentUser(testItem)).toEqual(expectedAction);
  });
});
