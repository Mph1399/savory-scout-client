import { Component, OnInit } from '@angular/core';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { Store } from '@ngrx/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './login/firebase-auth.service';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as SpinnerActions from './shared/spinner/store/spinner.actions';
import * as AuthActions from './login/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'savory-scout-client';
  constructor(
    private store: Store,
    private router: Router,
    private _snackBar: MatSnackBar
    ){
      this.router.events.subscribe((e : RouterEvent) => {
        this.navigationInterceptor(e);
      })
  }

     // Shows and hides the loading spinner during RouterEvent changes
     navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.store.dispatch(SpinnerActions.SPINNER_START());
        //this.loading = true
      }
      if (event instanceof NavigationEnd) {
        this.store.dispatch(SpinnerActions.SPINNER_END());
       // this.loading = false
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.store.dispatch(SpinnerActions.SPINNER_END());
      }
      if (event instanceof NavigationError) {
        this.store.dispatch(SpinnerActions.SPINNER_END());
      }
    }

  ngOnInit(){
    onAuthStateChanged(auth, (user) => {
      console.log('Auth State User: ', user);
      if (user) {
        // Create a copy of the user state
        const newUser = { ...user };

        const renewToken = () => {
          user.getIdToken(true).then((token) => {
            this.store.dispatch(
              AuthActions.AUTHENTICATE_SUCCESS({
                email: newUser.email,
                uid: newUser.uid,
                token: token,
              })
            );
            this._snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: `Logged in as: ${newUser.email}`,
                color: 'blue',
              },
              duration: 3000,
            });
            // Use timeout to force refresh the token after an hour
            setTimeout(() => renewToken(), 600000);
          })
         // this.store.dispatch(LocationActions.GET_USER_LOCATIONS({uid: newUser.uid}))
        };

        // user.getIdTokenResult(true).then(tokenResult => {
        //   console.log('Claims: ', tokenResult.claims)
        // })

        // Initiate the token renewal method
        renewToken();
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
