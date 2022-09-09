const dayjs = require('dayjs')
import { createReducer, on } from "@ngrx/store";
import * as FirestoreActions from './search-filter.actions';
const cloneDeep = require('clone-deep');

export interface FilterState {
    filters: {     
      active: boolean,
      date:  Date,
      food: boolean,
      drinks: boolean,
      events: boolean,
      happyHour: boolean,
      brunch: boolean,
      kids: boolean,
      outdoor: boolean,
      radius: number}
  }
  
  const initialState: FilterState = {
    filters: {
      active: true,
      date:  dayjs(new Date()).format('ddd MM/DD/YYYY'),
      food: true,
      drinks: true,
      events: true,
      happyHour: true,
      brunch: true,
      kids: true,
      outdoor: true,
      radius: 85
    }
};
    export const locationsReducer = createReducer(initialState,
        on(FirestoreActions.SET_FILTERS, (state, action) => {
           console.log('Action in CREATE_LOCATION Reducer: ', action)
           let stateCopy = cloneDeep(state.filters);
           console.log('Filters state Copy b4 merge: ', stateCopy)
           stateCopy = {...stateCopy, ...action}
           console.log('Filters state Copy after merge: ', stateCopy)

           return {
             ...state,
             filters: {...stateCopy}
           }
         }),
    )

  