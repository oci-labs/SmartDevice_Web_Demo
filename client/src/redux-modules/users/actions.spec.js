/* global describe, it, expect */

import { SET_ALL_USERS } from './action-types';
import { setAllUsers } from './actions';
import randomize from 'randomatic';

describe('Users action creators', () => {
    it('setAllUsers should create the expected action', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const expectedAction = {
            type: SET_ALL_USERS,
            payload: testItems
        };

        expect(setAllUsers(testItems)).toEqual(expectedAction);
    });
});
