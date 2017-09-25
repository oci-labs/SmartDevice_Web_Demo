/* global describe, it, expect */

import { SET_SNOOZED_ALERTS } from './action-types';
import { setSnoozedAlerts } from './actions';
import randomize from 'randomatic';

describe('Snoozed alerts action creators', () => {
    it('setSnoozedAlerts should create the expected action', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const expectedAction = {
            type: SET_SNOOZED_ALERTS,
            payload: testItems
        };

        expect(setSnoozedAlerts(testItems)).toEqual(expectedAction);
    });
});
