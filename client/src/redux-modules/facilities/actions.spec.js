/* global describe, it, expect */

import { SET_ALL_FACILITIES } from './action-types';
import { setAllFacilities } from './actions';
import randomize from 'randomatic';

describe('Facilities action creators', () => {
    it('setAllFacilities should create the expected action', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const expectedAction = {
            type: SET_ALL_FACILITIES,
            payload: testItems
        };

        expect(setAllFacilities(testItems)).toEqual(expectedAction);
    });
});
