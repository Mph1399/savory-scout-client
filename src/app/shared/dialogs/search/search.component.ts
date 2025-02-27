import { Subscription } from 'rxjs';
import { GeolocationService } from './../../services/geolocation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as FirestoreActions from '../../firestore/store/firestore.actions';
import * as FilterActions from '../search-filter/store/search-filter.actions';
import { GeoPackage } from '../../services/geolocation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  geoService$: Subscription;
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<SearchComponent>,
    private geoService: GeolocationService
    ) { }

  getUserLocation = () => {
    this.geoService$ = this.geoService.userCoords.subscribe(coords => {
      this.store.dispatch(FilterActions.SET_FILTERS({active: true }));
      this.store.dispatch(FirestoreActions.GET_LOCATIONS_BY_COORDS({lat: coords.location.lat, lng: coords.location.lng}));
      this.dialogRef.close();
    })
  }

  onSearch = (input) => {
    this.store.dispatch(FirestoreActions.GET_LOCATIONS_FROM_SEARCHBAR({input: input.value}));
    this.dialogRef.close();
  }

  ngOnDestroy(){
    try{
      this.geoService$.unsubscribe();
    }catch(e){}
    
  }

}
