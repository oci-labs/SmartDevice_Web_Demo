/* global describe, it, expect */

import {
    SET_SELECTED_DEPARTMENT, SET_SELECTED_FACILITY, SET_SELECTED_MACHINE,
    SET_SELECTED_MANIFOLD, SET_SELECTED_STATION, SET_SELECTED_VALVE
} from './action-types';
import {
    setSelectedDepartment, setSelectedFacility, setSelectedMachine,
    setSelectedManifold, setSelectedStation, setSelectedValve
} from './actions';
import randomize from 'randomatic';

describe('Selected context action creators', () => {
    it('setSelectedDepartment should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_DEPARTMENT,
            payload: testItem
        };

        expect(setSelectedDepartment(testItem)).toEqual(expectedAction);
    });

    it('setSelectedFacility should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_FACILITY,
            payload: testItem
        };

        expect(setSelectedFacility(testItem)).toEqual(expectedAction);
    });

    it('setSelectedMachine should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_MACHINE,
            payload: testItem
        };

        expect(setSelectedMachine(testItem)).toEqual(expectedAction);
    });

    it('setSelectedManifold should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_MANIFOLD,
            payload: testItem
        };

        expect(setSelectedManifold(testItem)).toEqual(expectedAction);
    });

    it('setSelectedStation should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_STATION,
            payload: testItem
        };

        expect(setSelectedStation(testItem)).toEqual(expectedAction);
    });

    it('setSelectedValve should create the expected action', () => {
        const testItem = { foo: randomize('*', 10) };
        const expectedAction = {
            type: SET_SELECTED_VALVE,
            payload: testItem
        };

        expect(setSelectedValve(testItem)).toEqual(expectedAction);
    });
});
