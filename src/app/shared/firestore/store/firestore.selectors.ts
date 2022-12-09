import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LocationsState } from './firestore.reducers';


export const selectLocations = createFeatureSelector<Readonly<LocationsState>>('locations');

export const getLocationsState = createSelector (selectLocations, (state) => {
    if(state.locations.length > 0 && state.locations[0].name === ''){
       /*   Try to retrieve an existing state from local storage */
        const storedLocations = JSON.parse(localStorage.getItem('locations')!);
        if(storedLocations){
            return{ locations: storedLocations }
        }
    }
    return state;
})

  // storeUserData = (userData: User) => {
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // };
  // fetchUserData = () => {
  //   return JSON.parse(localStorage.getItem('userData')!);
  // };
  // removeUserData = () => {
  //   localStorage.removeItem('userData');
  // };
