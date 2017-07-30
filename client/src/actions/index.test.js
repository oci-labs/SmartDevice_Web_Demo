import * as types from "./types";
import {setAllAlerts, getFirst, setSelectedItem} from './index';

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
};

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunk(store)(next)(action);

  return {store, next, invoke}
};

it('passes dispatch and getState', () => {
  const { store, invoke } = create();
  invoke((dispatch, getState) => {
    dispatch(setSelectedItem({id: 1, type: 'facility'}, false));
    getState();
  });
  //TODO: expect(store.dispatch).toHaveBeenCalledWith(types.SET_SELECTED_FACILITY);
  expect(store.getState).toHaveBeenCalled()
});


it('setAllAlerts returns expected action', () => {
  const payload = {alerts: 'alerts'};
  const action = setAllAlerts(payload);

  expect(action.type).toEqual(types.SET_ALL_ALERTS);
  expect(action.payload).toEqual(payload);
});

it('getFirst returns first item', () => {
  const items = [{id: 1}, {id: 2}, {id: 3}];
  expect(getFirst(items)).toEqual({id: 1});

});


