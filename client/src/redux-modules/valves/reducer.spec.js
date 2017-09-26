/* global describe, it, expect */

import { setSelectedValveStatus } from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Valves reducer', () => {
    it('should set the state to the payload when a SET_VALVE_STATUS action is received', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const newState = reducer(initialState, setSelectedValveStatus(testItems));

        expect(newState).toEqual(testItems);
    });
});
