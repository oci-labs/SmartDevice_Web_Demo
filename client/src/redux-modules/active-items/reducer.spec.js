/* global describe, it, expect */

import { setActiveItems, updateActiveItem } from './actions';
import reducer from './reducer';
import randomize from 'randomatic';

describe('Active items reducer', () => {
    it('should set the state to the payload when a SET_ACTIVE_ITEMS action is received', () => {
        const testItems = [
            { foo: randomize('*', 10) },
            { bar: randomize('*', 10) }
        ];

        const newState = reducer({}, setActiveItems(testItems));

        expect(newState).toEqual(testItems);
    });

    it('should update the appropriate item in state when an UPDATE_ACTIVE_ITEM action is received', () => {
        const testId = randomize('*', 10);
        const itemUpdate = {
            id: testId,
            newStuff: randomize('*', 10)
        };
        const testItems = [
            { id: testId, foo: randomize('*', 10) },
            { id: randomize('*', 10), bar: randomize('*', 10) },
            { id: randomize('*', 10), baz: randomize('*', 10) }
        ];

        const expectedState = testItems.map(item => item.id === testId ? itemUpdate : item);
        const newState = reducer(testItems, updateActiveItem(itemUpdate));

        expect(newState).toEqual(expectedState);
    });
});
