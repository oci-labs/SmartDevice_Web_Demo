/* global describe, it, expect */
import {selectShowUserModal} from './view-selectors';

describe('View selectors', () => {
  it('selectShowUserModal should return true if showUserModal is true in state', () => {
    const state = {
      view: {
        showUserModal: true
      }
    };
    expect(selectShowUserModal(state)).toEqual(true);
  });

  it('selectShowUserModal should return false if showUserModal is false in state', () => {
    const state = {
      view: {
        showUserModal: false
      }
    };
    expect(selectShowUserModal(state)).toEqual(false);
  });
});
