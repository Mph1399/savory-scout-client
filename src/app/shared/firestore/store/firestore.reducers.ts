import { GeoPoint, serverTimestamp } from 'firebase/firestore'
import { Location } from '../../models/location.model';
import { createReducer, on } from "@ngrx/store";
import * as FirestoreActions from './firestore.actions';

export interface LocationsState {
    locations: [Location]
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
        on(FirestoreActions.GET_LOCATIONS, (state, action) => {
           console.log('Action in GET_LOCATION Reducer: ', action.lat)
          // console.log()
          // localStorage.setItem('location', JSON.stringify(action.location));
           return {
             ...state,
           }
         }),
         on(FirestoreActions.SET_LOCATIONS, (state, action) => {
          console.log('Action in SET_LOCATION Reducer: ', action)
         // console.log()
         // localStorage.setItem('location', JSON.stringify(action.location));
          return {
            ...state,
            locations: action.locations
          }
        })
    )

  