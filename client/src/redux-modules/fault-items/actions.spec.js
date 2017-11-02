/* global describe, it, expect */

import {SET_ITEMS_IN_FAULT} from './action-types';
import {setItemsInFault} from './actions';

describe('Fault items action creators', () => {
  it('setItemsInFault should create the expected action', () => {
    const testItems = [{foo: 'foo'}, {bar: 'bar'}];
    const expectedAction = {
      type: SET_ITEMS_IN_FAULT,
      payload: testItems
    };

    expect(setItemsInFault(testItems)).toEqual(expectedAction);
  });
});
