/* global describe, it, expect */

import { SET_ACTIVE_ITEMS, UPDATE_ACTIVE_ITEM } from './action-types';
import { setActiveItems, updateActiveItem } from './actions';
import randomize from 'randomatic';

describe('Active items action creators', () => {
    it('setActiveItems should create the expected action', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];
        const expectedAction = {
            type: SET_ACTIVE_ITEMS,
            payload: testItems
        };

        expect(setActiveItems(testItems)).toEqual(expectedAction);
    });

    it('updateActiveItem should create the expected action', () => {
        const itemUpdate = {
            id: randomize('*', 10),
            foo: randomize('*', 10)
        };
        const expectedAction = {
            type: UPDATE_ACTIVE_ITEM,
            payload: itemUpdate
        };

        expect(updateActiveItem(itemUpdate)).toEqual(expectedAction);
    });
});
