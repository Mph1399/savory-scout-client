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
      console.log('Auth State User: ', user);
      console.log('Created At: ', user?.metadata.creationTime);
      const hoursSinceCreation = (moment(user?.metadata.creationTime).diff(moment(), 's') / 60) / 60;
      console.log('Hours since creation: ', hoursSinceCreation);

    //  console.log( moment(user?.metadata.creationTime, 'ddd, D MMM YYYY HH:mm:ss z').diff(now, 'minutes', true));
      if (user !== null) {
        // check if the user is anonymous and how long ago from now the user was created.
        if(user.isAnonymous && hoursSinceCreation < -168 ){
          // The anon user was created over a week ago so the user must log in with real credentials
          
        }
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
            setTimeout(() => renewToken(), 600000);
          }).catch((error) => {
            console.log('Error: ', error);
          })

        };
        // Initiate the token renewal method
        renewToken();
      } else {
        // this.router.navigateByUrl('/login');
        // Initiate an anonymous user with a limitied timespan b4 registering or doing an official login;
        signInAnonymously(auth).then((user) =>{
          console.log('User: ', user);
          user.user.getIdToken(true).then(token => {
            this.store.dispatch(
              AuthActions.AUTHENTICATE_SUCCESS({
                email: null,
                uid: user.user.uid,
                token: token,
              })
            );
          })

        }).catch((error) => {
          console.log('Error: ', error);
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: `Error: ${error}`,
              color: 'red-text',
            },
            duration: 30000,
          });
        })
      }
    });
  }

  anonUserExpiration(){

  if (this.screenWidth < 800) {
    // Open the dialog with these settings if the device is mobile
    const detailsModal = this.dialog.open(LoginComponent, {
      panelClass: 'myapp-no-padding-dialog',
      minWidth: '100vw',
      height: '100vh',
    });
  } else {
    // Open the dialog with these settings if the device is NOT MOBILE
    const detailsModal = this.dialog.open(LoginComponent, {
      width: '60vw',
      panelClass: 'myapp-no-padding-dialog',
    });
  }

  }
  }

