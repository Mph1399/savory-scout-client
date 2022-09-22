
import { createReducer, on } from "@ngrx/store";
import * as FirestoreActions from './search-filter.actions';
import * as moment from "moment";

export interface FilterState {
    filters: {     
      active: boolean,
      date:  moment.Moment,
      food: boolean,
      drinks: boolean,
      events: boolean,
      happyHour: boolean,
      brunch: boolean,
      kids: boolean,
      outdoor: boolean,
      radius: number}
  }
  
  export const initialState: FilterState = {
    filters: {
      active: true,
      date:  moment(new Date()),
      food: true,
      drinks: true,
      events: true,
      happyHour: true,
      brunch: true,
      kids: true,
      outdoor: true,
      radius: 50
    }
};
    export const searchFilterReducer = createReducer(initialState,
        on(FirestoreActions.SET_FILTERS, (state, action) => {
           console.log('Action in SEARCH FILTER Reducer: ', action)
           let stateCopy = JSON.parse(JSON.stringify(state.filters));
           console.log('Filters state Copy b4 merge: ', stateCopy)
           stateCopy = {...stateCopy, ...action}
           console.log('Filters state Copy after merge: ', stateCopy)

           return {
             ...state,
             filters: {...stateCopy}
           }
         }),
    )

  