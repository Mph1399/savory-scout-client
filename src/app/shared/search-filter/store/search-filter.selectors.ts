import { createSelector, createFeatureSelector } from "@ngrx/store";
 import { FilterState } from './search-filter.reducers' 

 export const selectFilter = createFeatureSelector<Readonly<FilterState>>('filters');

export const getFilterState = createSelector (selectFilter, (state) => {
    return state;
})