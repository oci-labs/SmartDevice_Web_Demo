/* global describe, it, expect */

import { setSnoozedAlerts } from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Snoozed alerts reducer', () => {
    it('should set the state to the payload when a SET_SNOOZED_ALERTS action is received', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const newState = reducer(initialState, setSnoozedAlerts(testItems));

        expect(newState).toEqual(testItems);
    });
});
