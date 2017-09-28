/* global describe, it, expect */

import {
    SET_VIEW_STATE, GO_TO_PREVIOUS_VIEW_STATE, TOGGLE_PROFILE, TOGGLE_ALERTS
} from './action-types';
import {
    setViewState, goToPreviousViewState, toggleProfile, toggleAlerts
} from './actions';
import randomize from 'randomatic';

describe('View action creators', () => {
    it('setViewState should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_VIEW_STATE,
            payload: testItem
        };

        expect(setViewState(testItem)).toEqual(expectedAction);
    });

    it('goToPreviousViewState should create the expected action', () => {
        const expectedAction = {
            type: GO_TO_PREVIOUS_VIEW_STATE
        };

        expect(goToPreviousViewState()).toEqual(expectedAction);
    });

    it('toggleProfile should create the expected action', () => {
        const expectedAction = {
            type: TOGGLE_PROFILE
        };

        expect(toggleProfile()).toEqual(expectedAction);
    });

    it('toggleAlerts should create the expected action', () => {
        const expectedAction = {
            type: TOGGLE_ALERTS
        };

        expect(toggleAlerts()).toEqual(expectedAction);
    });
});
