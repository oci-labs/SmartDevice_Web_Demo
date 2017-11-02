import {SET_ALL_FACILITIES} from './action-types';

export const setAllFacilities = facilities => ({
  type: SET_ALL_FACILITIES,
  payload: facilities
});
