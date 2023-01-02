import { Component, OnInit } from '@angular/core';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { Store } from '@ngrx/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, FirebaseAuthService } from './login/firebase-auth.service';
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
    private _snackBar: MatSnackBar,
    private authService: FirebaseAuthService
    ){
      this.router.events.subscribe((e : RouterEvent) => {
        this.navigationInterceptor(e);
      })
  }

     // Shows and hides the loading spinner during RouterEvent changes
     navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.store.dispatch(SpinnerActions.SPINNER_START({message: ''}));
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
    // Log the user in
    this.authService.userAuth();
            //  Disable Browwser Pinch Zoom ios 10~12
            // document.addEventListener('touchmove', function (event) {
            //   console.log('Touchstart: ', event.touches.length )
            //  if (event.touches.length > 1 || event.touches.length < -1) { 
            //   console.log('Pinch Zoom');
            //  // document.body.style.zoom = 1;
            //   event.preventDefault(); 
            // }
            // }, false);

   }
}
