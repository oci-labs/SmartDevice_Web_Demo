/* global describe, it, expect */

import {
    setViewState, goToPreviousViewState, toggleAlerts, toggleProfile
} from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Selected context reducer', () => {
    it('should set the department to the payload when a SET_VIEW_STATE action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setViewState(testItem));
        const expectedState = { ...initialState, VIEW_STATE: testItem, PREVIOUS_VIEW_STATE: initialState.VIEW_STATE };

        expect(newState).toEqual(expectedState);
    });

    it('should set the facility to the payload when a GO_TO_PREVIOUS_VIEW_STATE action is received', () => {
        const newState = reducer(initialState, goToPreviousViewState());
        const expectedState = { ...initialState, VIEW_STATE: initialState.PREVIOUS_VIEW_STATE, PREVIOUS_VIEW_STATE: initialState.VIEW_STATE };

        expect(newState).toEqual(expectedState);
    });

    it('should set the machine to the payload when a TOGGLE_PROFILE action is received', () => {
        const newState = reducer(initialState, toggleProfile());
        const expectedState = { ...initialState, viewProfile: !initialState.viewProfile };

        expect(newState).toEqual(expectedState);
    });

    it('should set the manifold to the payload when a TOGGLE_ALERTS action is received', () => {
        const newState = reducer(initialState, toggleAlerts());
        const expectedState = { ...initialState, viewAlerts: !initialState.viewAlerts };

        expect(newState).toEqual(expectedState);
    });
});
