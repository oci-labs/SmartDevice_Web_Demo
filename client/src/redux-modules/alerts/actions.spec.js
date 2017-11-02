/* global describe, it, expect */

import {SET_ALL_ALERTS} from './action-types';
import {setAllAlerts} from './actions';
import randomize from 'randomatic';

describe('Alerts action creators', () => {
  it('setAllAlerts should create the expected action', () => {
    const testItems = [{foo: randomize('*', 10)}, {bar: randomize('*', 10)}];
    const expectedAction = {
      type: SET_ALL_ALERTS,
      payload: testItems
    };

    expect(setAllAlerts(testItems)).toEqual(expectedAction);
  });
});
