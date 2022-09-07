import { createSelector, createFeatureSelector } from "@ngrx/store";
import { User } from '../user.model';
import { authState } from './auth.reducer' 

export const selectUser = createFeatureSelector<Readonly<User>>('auth');
export const selectUserAuth = createFeatureSelector<Readonly<authState>>('auth');

export const getUser = createSelector (selectUser, (user) => {
    return user;
})

export const getAuthState = createSelector (selectUserAuth, (state) => {
    return state;
})