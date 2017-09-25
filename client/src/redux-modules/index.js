import { combineReducers } from 'redux';
import activeItemsReducer from './active-items/reducer';
import alertsReducer from './alerts/reducer';
import currentUserReducer from './current-user/reducer';
import errorsReducer from './errors/reducer';
import facilitiesReducer from './facilities/reducer';
import faultItemsReducer from './fault-items/reducer';
import selectedContextReducer from './selected-context/reducer';
import snoozedAlertReducer from './snoozed-alerts/reducer';
import usersReducer from './users/reducer';
import valvesReducer from './valves/reducer';
import viewReducer from './view/reducer';

export default combineReducers({
    activeItems: activeItemsReducer,
    alerts: alertsReducer,
    currentUser: currentUserReducer,
    errors: errorsReducer,
    facilities: facilitiesReducer,
    faultItems: faultItemsReducer,
    selectedContext: selectedContextReducer,
    snoozedAlerts: snoozedAlertReducer,
    users: usersReducer,
    valves: valvesReducer,
    view: viewReducer
});
