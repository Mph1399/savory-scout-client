import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { catchError, map, of, Subscription } from "rxjs";
import { CitySelectComponent } from "../shared/city-select/city-select.component";
import { Location } from "../shared/models/location.model";
import { DeviceDetailsService } from "../shared/services/device-details.service";
import { GeolocationService } from "../shared/services/geolocation.service";
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import * as FirestoreActions from '../shared/firestore/store/firestore.actions';
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import getDistance from 'geolib/es/getDistance';
import convertDistance from 'geolib/es/convertDistance';

export interface Marker {
    position: {lat: number, lng: number},
    title: string,
    label: {
      color: 'red',
      text: string,
    },
    info: Location,
    options: {}
  }

@Injectable()
export class MapService implements OnDestroy{
    geoCoords$ = this.geolocationService.coords.subscribe(coords => this.geoCoords = coords.location);
    geoCoords;
    geoService$: Subscription;
    screenWidth = this.deviceDetailsService.screenWidth;

    constructor(
        private dialog: MatDialog,
        private store: Store,
        private deviceDetailsService: DeviceDetailsService,
        private geolocationService: GeolocationService,
        private _snackBar: MatSnackBar
        ){}
   
    createMarkersArray = (locations: Location[]) => {
        const markers: Marker[] = [];
        locations.forEach(location => {
            markers.push({
                position: {lat: location.lat!, lng: location.lng!}, 
                title: location.name,
                label: {color: 'red', text: location.address},
                info: location,
                options: { 
                  animation: google.maps.Animation.DROP,
                  icon: location.active ? {url: 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png'} : 
                  {url: 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png'},

                 }  
            })
        });
        return markers;
    }

    geoMyLocation = () => {
        this.geoService$ = this.geolocationService.coords
        .pipe(
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
        .subscribe(locationResults => this.searchByCoords(locationResults.location.lat, locationResults.location.lng));
       }

    openCitySelect = () => {
        console.log('OPening City Select')
        this.screenWidth < 800 ? this.dialog.open(
          CitySelectComponent, { panelClass: 'myapp-no-padding-dialog', minWidth: '100vw',  maxWidth: '100vw', height: '60vh',}) : 
          this.dialog.open(CitySelectComponent, {panelClass: 'myapp-no-padding-dialog', width: '60vw',})
    }
    evaluateMapDistanceFromLastCenter = (lat: number, lng: number, filters) => {
      console.log('Coords: ', this.geoCoords)
          const dist = convertDistance(getDistance({lat: this.geoCoords.lat, lng: this.geoCoords.lng},{lat: lat, lng: lng}), 'mi');
          console.log("Distance: ", dist);
          if(dist > filters.radius / 2){
            console.log('long distance');
            this.geolocationService.coords.next({location: {lat: lat, lng: lng}});
            this.searchByCoords(lat, lng);
          }
    }

    searchByCoords = (lat: number, lng: number) => {
      localStorage.getItem('userDate') !== null ?
      this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS_ANONYMOUS({lat: lat, lng:lng})) :
      this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: lat, lng: lng}))
    }

    ngOnDestroy(){
       this.geoService$.unsubscribe();
       this.geoCoords$.unsubscribe();
      }

}