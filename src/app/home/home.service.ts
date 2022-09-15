import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs';
import { GeolocationService } from '../shared/services/geolocation.service';
import * as FirestoreActions from '../shared/firestore/store/firestore.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class HomeService implements OnDestroy {
    
    constructor(
        private geoService:GeolocationService,
        private store: Store
        ){}

    geoMyLocation = () => {
        this.geoService.findIpGeo().subscribe(locationResults => this.getLocationsFromFirestore(locationResults.lat, locationResults.lng));
    }

    getLocationsFromFirestore = (lat: number, lng: number) => {
        this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: lat, lng: lng}))
    }

    ngOnDestroy(){

    }
 
}