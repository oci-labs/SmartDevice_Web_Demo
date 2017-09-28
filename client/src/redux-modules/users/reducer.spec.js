/* global describe, it, expect */

import { setAllUsers } from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Users reducer', () => {
    it('should set the state to the payload when a SET_ALL_USERS action is received', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const newState = reducer(initialState, setAllUsers(testItems));

        expect(newState).toEqual(testItems);
    });
});
