import { ActionReducerMap } from '@ngrx/store';
import * as FromAuth from '../login/store//auth.reducer'
import * as FromSpinner from '../shared/spinner/store/spinner.reducer';
import * as FromLocations from '../shared/firestore/store/firestore.reducers'

export interface AppState {
     spinner: FromSpinner.SpinnerState;
     auth: FromAuth.authState;
     locations: FromLocations.LocationsState;

  }
  
  export const appReducer: ActionReducerMap<AppState> = {
     spinner: FromSpinner.spinnerReducer,
     auth: FromAuth.authReducer,
     locations: FromLocations.locationsReducer,
  };