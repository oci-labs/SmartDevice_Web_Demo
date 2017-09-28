import {
  GO_TO_PREVIOUS_VIEW_STATE,
  SET_VIEW_STATE,
  TOGGLE_ALERTS,
  TOGGLE_PROFILE,
  TOGGLE_USER_MODAL
} from './action-types';

export const initialState = {
  PREVIOUS_VIEW_STATE: 'state:facility',
  VIEW_STATE: 'state:facility',
  viewProfile: true,
  viewAlerts: false,
  showUserModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_STATE:
      return {
        ...state,
        PREVIOUS_VIEW_STATE: state.VIEW_STATE,
        VIEW_STATE: action.payload
      };
    case GO_TO_PREVIOUS_VIEW_STATE:
      return {
        ...state,
        VIEW_STATE: state.PREVIOUS_VIEW_STATE,
        PREVIOUS_VIEW_STATE: state.VIEW_STATE
      };
    case TOGGLE_ALERTS:
      return { ...state, viewAlerts: !state.viewAlerts };
    case TOGGLE_PROFILE:
      return { ...state, viewProfile: !state.viewProfile };
    case TOGGLE_USER_MODAL:
      return { ...state, showUserModal: !state.showUserModal };
    default:
      return state;
  }
};
