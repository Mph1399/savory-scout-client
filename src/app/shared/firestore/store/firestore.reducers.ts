import { GeoPoint, serverTimestamp } from 'firebase/firestore'
import { Location } from '../../models/location.model';
import { createReducer, on } from "@ngrx/store";
import * as FirestoreActions from './firestore.actions';

export interface LocationsState {
    locations: Location[]
  }
  
 const initialState: LocationsState = {
    locations: [{
        active: false,
        name: '',
        phone: '',
        address: '',
        verification_stage: 0,
        formattedPhone: '',
        id: '',
        uid: '',
        food: {active: false, color: 'gray', recurring: false, recurringSpecials: [], specificDate: false, specificDateSpecials: []},
        drinks: {active: false, color: 'gray', recurring: false, recurringSpecials: [], specificDate: false, specificDateSpecials: []},
        events: {active: false, color: 'gray', recurring: false, recurringSpecials: [], specificDate: false, specificDateSpecials: []},
        google_id: '',
        updated_at: serverTimestamp(),
        website: '',
        managed: false,
        image_url: '',
        thumb_url: '',
        outdoorSeating: false,
        g: { geohash: '', geopoint: new GeoPoint(0, 0)} 
    }]
};
    export const locationsReducer = createReducer(initialState,
        // on(FirestoreActions.GET_LOCATIONS_BY_COORDS, (state, action) => {

        //    return {
        //      ...state,
        //    }
        //  }),
        //  on(FirestoreActions.GET_LOCATIONS_BY_COORDS_ANONYMOUS, (state, action) => {
        // //  console.log('Action in GET_LOCATION ANONYMOUS Reducer: ', action);
        // //  console.log('State in GET_LOCATION ANONYMOUS Reducer: ', state)
        //   return {
        //     ...state,
        //   }
        // }),
        //  on(FirestoreActions.GET_LOCATIONS_FROM_SEARCHBAR, (state, action) => {
        //   return {
        //     ...state,
        //   }
        // }),
        // on(FirestoreActions.GET_LOCATION_BY_PLACE_ID, (state, action) => {
        //   return {
        //     ...state,
        //   }
        // }),
        // on(FirestoreActions.GET_LOCATION_BY_PLACE_ID_ANONYMOUS, (state, action) => {
        //   return {
        //     ...state,
        //   }
        // }),

         on(FirestoreActions.SET_LOCATIONS, (state, action) => {
          console.log('Action in SET_LOCATION Reducer: ', action)
          return {
            ...state,
            locations: action.locations
          }
        }),
        on(FirestoreActions.NO_LOCATIONS, (state, action) => {
          console.log('Action in NO_LOCATIONS Reducer: ', action)
          return {
            ...state,
            locations: initialState.locations
          }
        })
    )

  