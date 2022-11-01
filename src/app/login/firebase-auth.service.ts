import { environment } from 'src/environments/environment';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  FacebookAuthProvider
} from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as AuthActions from '../login/store/auth.actions';
import * as moment from 'moment';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { DeviceDetailsService } from '../shared/services/device-details.service';
import { Router } from '@angular/router';
firebase.initializeApp(environment.firebase);


// Initialize the FirebaseUI Widget using Firebase.
export var ui = new firebaseui.auth.AuthUI(firebase.auth());
export const auth = getAuth();
const provider  = new FacebookAuthProvider();
 
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  screenWidth = this.deviceDetailsService.screenWidth;

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private deviceDetailsService: DeviceDetailsService
  ){}
  
  signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  signOut = () => {
    return signOut(auth);
  };

  userAuth = () => {
    onAuthStateChanged(auth, (user) => {
    //  console.log('Auth State User: ', user);
    //  console.log('Created At: ', user?.metadata.creationTime);
      const hoursSinceCreation = (moment(user?.metadata.creationTime).diff(moment(), 's') / 60) / 60;
    //  console.log('Hours since creation: ', hoursSinceCreation);

    //  console.log( moment(user?.metadata.creationTime, 'ddd, D MMM YYYY HH:mm:ss z').diff(now, 'minutes', true));
      if (user !== null) {

        // Create a copy of the user state
        const loggedUser = { ...user };

        const renewToken = () => {
          user.getIdToken(true)
          .then((token) => {
            this.store.dispatch(
              AuthActions.AUTHENTICATE_SUCCESS({
                email: loggedUser.email,
                uid: loggedUser.uid,
                token: token,
              })
            );

           if(loggedUser.email !== null){ 
            this._snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: `Logged in as: ${loggedUser.email}`,
                color: 'blue-text',
              },
              duration: 3000,
            });
          }
            // Use timeout to force refresh the token after an hour
            setTimeout(() => renewToken(), 6000000);
          }).catch((error) => {
            console.log('Error: ', error);
          })
          localStorage.removeItem('userDate');
        };
        // Initiate the token renewal method
        renewToken();
      } else {
        // this.router.navigateByUrl('/login');
        /* The user isn't logged in but we want them to have a little bit of a free trial.
        1) check to see if a date is set in local storage. If not, set the current date in local storage. 
        2) check the date and allow 1 week of free usage,
        3) If the time is over 1 week, redirect to the login page */
        const userDate = localStorage.getItem('userDate')
       if(userDate === null){
        localStorage.setItem('userDate', JSON.stringify(new Date())) 
      } else { 
        const elapsed = (moment(JSON.parse(userDate)).diff(moment(), 's') / 60) / 60;
        console.log('TIME: ', elapsed);
        /* This is where the user has a timestamp in local storage bc they haven't used a login. Lets check the time elapsed since the timestamp creation
        and either allow their trial to continue by using cloud functions to find their locations, or prompt them to login after the trial period has passed
        */
       if (elapsed < -7){
        // The tial period of 7 days has elapsed.
         this.router.navigateByUrl('login');
       } 
      }

      }
    });
  }
  }

        // Initiate an anonymous user with a limitied timespan b4 registering or doing an official login;
        // signInAnonymously(auth).then((user) =>{
        //   console.log('User: ', user);
        //   user.user.getIdToken(true).then(token => {
        //     this.store.dispatch(
        //       AuthActions.AUTHENTICATE_SUCCESS({
        //         email: null,
        //         uid: user.user.uid,
        //         token: token,
        //       })
        //     );
        //   })

        // }).catch((error) => {
        //   console.log('Error: ', error);
        //   this._snackBar.openFromComponent(SnackbarComponent, {
        //     data: {
        //       message: `Error: ${error}`,
        //       color: 'red-text',
        //     },
        //     duration: 30000,
        //   });
        // })