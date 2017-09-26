/* global describe, it, expect */

import { HANDLE_ERROR } from './action-types';
import { throwError } from './actions';
import randomize from 'randomatic';

describe('Errors action creators', () => {
    it('throwError should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: HANDLE_ERROR,
            payload: testItem
        };

        expect(throwError(testItem)).toEqual(expectedAction);
    });
});
