/* global describe, it, expect */

import {
    setSelectedDepartment, setSelectedFacility, setSelectedMachine,
    setSelectedManifold, setSelectedStation, setSelectedValve
} from './actions';
import randomize from 'randomatic';
import reducer, { initialState } from './reducer';

describe('Selected context reducer', () => {
    it('should set the department to the payload when a SET_SELECTED_DEPARTMENT action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedDepartment(testItem));
        const expectedState = { ...initialState, department: testItem };

        expect(newState).toEqual(expectedState);
    });

    it('should set the facility to the payload when a SET_SELECTED_FACILITY action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedFacility(testItem));
        const expectedState = { ...initialState, facility: testItem };

        expect(newState).toEqual(expectedState);
    });

    it('should set the machine to the payload when a SET_SELECTED_MACHINE action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedMachine(testItem));
        const expectedState = { ...initialState, machine: testItem };

        expect(newState).toEqual(expectedState);
    });

    it('should set the manifold to the payload when a SET_SELECTED_MANIFOLD action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedManifold(testItem));
        const expectedState = { ...initialState, manifold: testItem };

        expect(newState).toEqual(expectedState);
    });

    it('should set the station to the payload when a SET_SELECTED_STATION action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedStation(testItem));
        const expectedState = { ...initialState, station: testItem };

        expect(newState).toEqual(expectedState);
    });

    it('should set the valve to the payload when a SET_SELECTED_VALVE action is received', () => {
        const testItem = { foo: randomize('*', 10) };
        const newState = reducer(initialState, setSelectedValve(testItem));
        const expectedState = { ...initialState, valve: testItem };

        expect(newState).toEqual(expectedState);
    });
});
