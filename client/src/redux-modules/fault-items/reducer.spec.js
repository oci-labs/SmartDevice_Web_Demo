/* global describe, it, expect */

import {setItemsInFault} from './actions';
import reducer from './reducer';

describe('Fault items reducer', () => {
  it('should set the state to the payload when a SET_ITEMS_IN_FAULT action is received', () => {
    const testItems = [{foo: 'foo'}, {bar: 'bar'}];

    const newState = reducer({}, setItemsInFault(testItems));

    expect(newState).toEqual(testItems);
  });
});
