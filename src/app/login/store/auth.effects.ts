import { Router } from '@angular/router';
import { FirebaseAuthService } from './../firebase-auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { tap, map } from 'rxjs';


@Injectable()
export class AuthEffects {


  authLogout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.firebaseAuthService.signOut()
          .then(data => {
           // this.removeUserData();
            this.router.navigateByUrl('/login');
            console.log('Logout Data: ', data)})
          .catch(err => console.log('Error: ', err));
         
        })
      ),
    { dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  // storeUserData = (userData: User) => {
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // };
  // fetchUserData = () => {
  //   return JSON.parse(localStorage.getItem('userData')!);
  // };
  // removeUserData = () => {
  //   localStorage.removeItem('userData');
  // };
}

