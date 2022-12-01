import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth.actions'
import { Component, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ui } from './firebase-auth.service'
import { Subscription } from 'rxjs';
import { getAuthState } from './store/auth.selectors';
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui!: firebaseui.auth.AuthUI;
  authStore$: Subscription = new Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router, private store: Store) { 
    
  }

  ngOnInit(): void {
    const scope = this;
    this.authStore$ = this.store.select( getAuthState ).subscribe(user => {
      if(!user){
        this.router.navigateByUrl('/home')
      }
    })

    const uiConfig: any = {
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
          scope.store.dispatch(AuthActions.AUTHENTICATE_SUCCESS({ 
            email: authResult.email,
            uid: authResult.uid,
            token: authResult.accessToken} 
          ))
          // User successfully signed in.
          // Retrieve the users location from the DB
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log("Auth Result: ", authResult)
          return true;
        }
      }
    }
    ui.start('#firebaseui-auth-container', uiConfig);

  //  ui.disableAutoSignIn();
  /* Someimtes the spinner will still be running after a redirect to the login page. */
  this.store.dispatch(SpinnerActions.SPINNER_END())
  }

ngOnDestroy(){
  ui.delete();
  this.authStore$.unsubscribe();
}
}
