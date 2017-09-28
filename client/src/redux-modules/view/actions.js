import { TOGGLE_PROFILE, SET_VIEW_STATE, GO_TO_PREVIOUS_VIEW_STATE, TOGGLE_ALERTS } from './action-types';

export const toggleProfile = () =>({
    type: TOGGLE_PROFILE
});

export const setViewState = state => ({
    type: SET_VIEW_STATE,
    payload: state
});

export const goToPreviousViewState = () => ({
    type: GO_TO_PREVIOUS_VIEW_STATE
});

export const toggleAlerts = () => ({
    type: TOGGLE_ALERTS
});
