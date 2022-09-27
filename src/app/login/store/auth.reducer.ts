import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthAction from './auth.actions';

export interface authState {
  user: User | null;
}

const initialState: authState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthAction.LOGOUT, (state, action) => {
    console.log('Logout Running, ', state);
    return {
      ...state,
     user: null 
    };
  }),
  
  on(AuthAction.AUTHENTICATE_SUCCESS, (state, action) => {
    // console.log('Login Reducer Running');

    const user = new User ( 
      action.email,
      action.uid,
      action.token
    );
    return {
      ...state,
      user: user,
    };
  })
);
