import { createSelector, createFeatureSelector } from "@ngrx/store";
 import { FilterState } from './search-filter.reducers' 

 export const selectLocations = createFeatureSelector<Readonly<FilterState>>('locations');

export const getLocationsState = createSelector (selectLocations, (state) => {
    return state;
})