import {SET_ITEMS_IN_FAULT} from './action-types';

export const setItemsInFault = itemsInFault => ({
  type: SET_ITEMS_IN_FAULT,
  payload: itemsInFault
});
