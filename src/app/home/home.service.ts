import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { GeolocationService } from '../shared/services/geolocation.service';
import * as FirestoreActions from '../shared/firestore/store/firestore.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetailsService } from '../shared/services/device-details.service';
import { CitySelectComponent } from '../shared/city-select/city-select.component';
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Injectable({
    providedIn: 'root'
  })
export class HomeService implements OnDestroy {
    geoService$: Subscription;
    screenWidth = this.deviceDetailsService.screenWidth;
    
    constructor(
        private geoService:GeolocationService,
        private store: Store,
        private dialog: MatDialog,
        private deviceDetailsService: DeviceDetailsService,
        private _snackBar: MatSnackBar
        ){}

    geoMyLocation = () => {
      this.store.dispatch(SpinnerActions.SPINNER_START());
  //  try{
      this.geoService$ = this.geoService.coords
     .pipe(
      tap(val => console.log("Value in findGeo: ", val)),
      catchError(error => {
            this.openCitySelect();  
            this.store.dispatch(SpinnerActions.SPINNER_END());
            this._snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: 'We could not access your location, please choose a city.',
                  color: 'red-text',
                },
                duration: 3000,
              });
          return of(error)
        })
     )
     .subscribe(locationResults => {
      this.store.dispatch(SpinnerActions.SPINNER_START());
      console.log("results: ", locationResults)
        console.log('Running SUBSCRIBE GEO. userDate = ', localStorage.getItem('userDate'));
        /* If the user has logged in, the userDate value from local storage will be missing/removed */
       localStorage.getItem('userDate') !== null ?
       this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS_ANONYMOUS({lat: locationResults.location.lat, lng: locationResults.location.lat})) :
       this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: locationResults.location.lat, lng: locationResults.location.lng}))
    });
 // } catch(e){ console.log("Error: ", e)}
  }

    ngOnDestroy(){
        this.geoService$.unsubscribe();
    }

    openCitySelect = () => {
        console.log('OPening City Select')
        this.screenWidth < 800 ? this.dialog.open(
            CitySelectComponent, { panelClass: 'myapp-no-padding-dialog', minWidth: '100vw',  maxWidth: '100vw', height: '60vh',}) : 
            this.dialog.open(CitySelectComponent, {panelClass: 'myapp-no-padding-dialog', width: '60vw',})
    }  
 
}