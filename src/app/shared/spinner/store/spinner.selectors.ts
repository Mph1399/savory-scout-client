import { createSelector, createFeatureSelector } from "@ngrx/store";

import { SpinnerState } from './spinner.reducer' 

export const selectSpinner = createFeatureSelector<Readonly<SpinnerState>>('spinner');

export const getSpinnerState = createSelector (selectSpinner, (state) => {
    return state;
})
