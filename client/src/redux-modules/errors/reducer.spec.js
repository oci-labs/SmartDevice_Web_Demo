/* global describe, it, expect */

import {throwError} from './actions';
import randomize from 'randomatic';
import reducer, {initialState} from './reducer';

describe('Errors reducer', () => {
  it('should set the state to the payload when a HANDLE_ERROR action is received', () => {
    const testItem = {foo: randomize('*', 10)};
    const newState = reducer(initialState, throwError(testItem));

    expect(newState).toEqual(testItem);
  });
});
