import { createReducer, on } from "@ngrx/store";
import * as SpinnerActions from './spinner.actions'


export interface SpinnerState {
    isOn: boolean
  }
  
  const initialState: SpinnerState = {
    isOn: false
  };

  export const spinnerReducer = createReducer(initialState, 
    on(SpinnerActions.SPINNER_START, (state, action) => {
      console.log('Spinner ON');
      return {
        ...state,
        isOn: true
      }
    }),
    on(SpinnerActions.SPINNER_END, (state, action) => {
      console.log('Spinner OFF');
        return {
          ...state,
          isOn: false
        }
      })

  )