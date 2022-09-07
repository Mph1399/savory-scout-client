import { environment } from 'src/environments/environment';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';


import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { Injectable } from '@angular/core';
firebase.initializeApp(environment.firebase);


// Initialize the FirebaseUI Widget using Firebase.
export var ui = new firebaseui.auth.AuthUI(firebase.auth());
export const auth = getAuth();

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  signOut = () => {
    return signOut(auth);
  };
}
