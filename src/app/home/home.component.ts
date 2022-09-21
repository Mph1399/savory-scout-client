import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeolocationService } from '../shared/services/geolocation.service';
import { HomeService } from './home.service';

import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors'
import { tap } from 'rxjs';
import { Location } from '../shared/models/location.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredLocations: Location[];
  filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState).pipe(
    tap(val => console.log('Filtered Locations Value: ', val))
  ).subscribe(value => {
    console.log('Firestore Values Changed: ', value);
    this.filteredLocations = value.locations;

  })
  screenWidth = this.deviceDetailsService.screenWidth;
  constructor(
    private deviceDetailsService: DeviceDetailsService,
    private homeService: HomeService,
    private store: Store
    ) { }

  ngOnInit(): void {
    console.log('screewidth: ', this.screenWidth)
    this.homeService.geoMyLocation();
    
   // this.geoService.findIpGeo().subscribe(locationResults => console.log("Location Results :", locationResults))
   // this.firestoreService.geoSearchLocations(this.geoService.fetchHash(), this.geoService.lat, this.geoService.lng)
    
    // this.serializedDate = new FormControl((new Date()).toISOString());
    // this.dayOfTheWeek = this.displayRestaurantFilterService.formatDay(this.date);
  }

}
