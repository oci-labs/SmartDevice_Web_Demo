/* global describe, it, expect */

import {SET_VALVE_STATUS} from './action-types';
import {setSelectedValveStatus} from './actions';
import randomize from 'randomatic';

describe('Valves action creators', () => {
  it('setSelectedValveStatus should create the expected action', () => {
    const testItems = [{foo: randomize('*', 10)}, {bar: randomize('*', 10)}];
    const expectedAction = {
      type: SET_VALVE_STATUS,
      payload: testItems
    };

    expect(setSelectedValveStatus(testItems)).toEqual(expectedAction);
  });
});
