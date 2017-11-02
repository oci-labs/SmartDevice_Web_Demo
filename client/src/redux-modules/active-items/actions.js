import {SET_ACTIVE_ITEMS, UPDATE_ACTIVE_ITEM} from './action-types';

export const setActiveItems = items => ({
  type: SET_ACTIVE_ITEMS,
  payload: items
});

export const updateActiveItem = itemUpdate => ({
  type: UPDATE_ACTIVE_ITEM,
  payload: itemUpdate
});
