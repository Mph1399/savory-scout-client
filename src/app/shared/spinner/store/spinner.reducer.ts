import { createReducer, on } from "@ngrx/store";
import * as SpinnerActions from './spinner.actions'


export interface SpinnerState {
    isOn: boolean,
    message: string
  }
  
  const initialState: SpinnerState = {
    isOn: false,
    message: 'loading'
  };

  export const spinnerReducer = createReducer(initialState, 
    on(SpinnerActions.SPINNER_START, (state, action) => {
    //  console.log('Spinner ON');
      return {
        ...state,
        isOn: true,
        message: action.message
      }
    }),
    on(SpinnerActions.SPINNER_END, (state, action) => {
    //  console.log('Spinner OFF');
        return {
          ...state,
          isOn: false
        }
      })

  )