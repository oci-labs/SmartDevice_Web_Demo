/* global describe, it, expect */

import {setCurrentUser, setCredentials} from './actions';
import randomize from 'randomatic';
import reducer, {initialState} from './reducer';

describe('Current user reducer', () => {
  it('should set the username to the payload when a SET_CURRENT_USER action is received', () => {
    const testItem = randomize('*', 10);
    const newState = reducer(initialState, setCurrentUser(testItem));
    const expectedState = {...initialState, user: testItem};

    expect(newState).toEqual(expectedState);
  });

  it('should set the credentials to the payload when a SET_CREDENTIALS action is received', () => {
    const testItem = randomize('*', 10);
    const newState = reducer(initialState, setCredentials(testItem));
    const expectedState = {...initialState, credentials: testItem};

    expect(newState).toEqual(expectedState);
  });
});
