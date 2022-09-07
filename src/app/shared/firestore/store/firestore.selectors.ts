import { createSelector, createFeatureSelector } from "@ngrx/store";
 import { LocationsState } from './firestore.reducers' 

 export const selectLocations = createFeatureSelector<Readonly<LocationsState>>('locations');

export const getLocationsState = createSelector (selectLocations, (state) => {
    return state;
})