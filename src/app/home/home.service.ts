import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs';
import { GeolocationService } from '../shared/services/geolocation.service';
import * as FirestoreActions from '../shared/firestore/store/firestore.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetailsService } from '../shared/services/device-details.service';
import { CitySelectComponent } from '../shared/city-select/city-select.component';

@Injectable()
export class HomeService implements OnDestroy {
    geoService$;
    screenWidth = this.deviceDetailsService.screenWidth;;
    
    constructor(
        private geoService:GeolocationService,
        private store: Store,
        private dialog: MatDialog,
        private deviceDetailsService: DeviceDetailsService
        ){}

    geoMyLocation = () => {
     this.geoService$ =  this.geoService.findIpGeo().subscribe(locationResults => this.getLocationsFromFirestore(locationResults.lat, locationResults.lng));
    }

    getLocationsFromFirestore = (lat: number, lng: number) => {
        this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: lat, lng: lng}))
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