/* global describe, it, expect */

import {setAllFacilities} from './actions';
import randomize from 'randomatic';
import reducer, {initialState} from './reducer';

describe('Facilities reducer', () => {
  it('should set the state to the payload when a SET_ALL_FACILITIES action is received', () => {
    const testItems = [{foo: randomize('*', 10)}, {bar: randomize('*', 10)}];
    const newState = reducer(initialState, setAllFacilities(testItems));

    expect(newState).toEqual(testItems);
  });
});
