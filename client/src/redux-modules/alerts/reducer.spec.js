/* global describe, it, expect */

import { setAllAlerts } from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Alerts reducer', () => {
    it('should set the state to the payload when a SET_ALL_ALERTS action is received', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const newState = reducer(initialState, setAllAlerts(testItems));

        expect(newState).toEqual(testItems);
    });
});
