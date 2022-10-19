import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { catchError, of, Subscription } from "rxjs";
import { CitySelectComponent } from "../shared/city-select/city-select.component";
import { Location } from "../shared/models/location.model";
import { DeviceDetailsService } from "../shared/services/device-details.service";
import { GeolocationService } from "../shared/services/geolocation.service";
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import * as FirestoreActions from '../shared/firestore/store/firestore.actions';

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
    geoService$: Subscription;
    screenWidth = this.deviceDetailsService.screenWidth;

    constructor(
        private dialog: MatDialog,
        private store: Store,
        private deviceDetailsService: DeviceDetailsService,
        private geolocationService: GeolocationService,
        ){}
   
    createMarkersArray = (locations: Location[]) => {
        const markers: Marker[] = [];
        locations.forEach(location => {
            markers.push({
                position: {lat: location.lat!, lng: location.lng!}, 
                title: location.name,
                label: {color: 'red', text: location.address},
                info: location,
                options: { animation: google.maps.Animation.BOUNCE }  
            })
        });
        return markers;
    }

    geoMyLocation = () => {
        this.geoService$ =  this.geolocationService.findIpGeo()
        .pipe(
           catchError(error => {
               this.openCitySelect();  
               this.store.dispatch(SpinnerActions.SPINNER_END()); 
             return of(error)
           })
        )
        .subscribe(locationResults => this.getLocationsFromFirestore(locationResults.lat, locationResults.lng));
       }

       getLocationsFromFirestore = (lat: number, lng: number) => {
        this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: lat, lng: lng}))
    }

    openCitySelect = () => {
        console.log('OPening City Select')
        this.screenWidth < 800 ? this.dialog.open(
            CitySelectComponent, { panelClass: 'myapp-no-padding-dialog', minWidth: '100vw',  maxWidth: '100vw', height: '60vh',}) : 
            this.dialog.open(CitySelectComponent, {panelClass: 'myapp-no-padding-dialog', width: '60vw',})
    }  
    ngOnDestroy(){
        this.geoService$.unsubscribe();
      }
}