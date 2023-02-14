
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors'
import { Location } from '../shared/models/location.model';
import * as FilterSelectors from '../shared/dialogs/search-filter/store/search-filter.selectors'; 
import { MapService, Marker } from './map.service';
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component'
import { DeviceDetailsService } from '../shared/services/device-details.service';
import { GeolocationService } from '../shared/services/geolocation.service'
import { LocationsState } from '../shared/firestore/store/firestore.reducers';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  filters;
  filters$ = this.store.select(FilterSelectors.getFilterState).pipe(tap(state => this.filters = state.filters));
  filterState$ = Subscription;
  userLocationMarkerOptions = { icon:  {url: './../assets/icons/markers/user_location_2.gif'}}  
  lastSelectedInfoWindow: any;
  center: google.maps.LatLngLiteral;
  bounds: google.maps.LatLngBounds;
  initialBoundsSet = false;
  mapPage = false;
  zoom = 13;
  infoContent: Location;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  }
  markers: Array<Marker> = [];
  initialLocationsFound = false;
  screenWidth = this.deviceDetailsService.screenWidth;
  // bounds = new google.maps.LatLngBounds();
  filteredLocations$ : Observable<LocationsState>;
  userLocation$ = this.geolocationService.userCoords.pipe(
    tap(user => {
      if(user.location.lat != 0){
        window.setTimeout(() => {
          console.log(user.location.lat, ' ' , user.location.lng)
          this.bounds.extend(new google.maps.LatLng(user.location.lat, user.location.lng));
          this.map.fitBounds(this.bounds);
        }, 1000)

      }
    })
  );


  constructor(
    private mapService: MapService,
    private store: Store,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private deviceDetailsService: DeviceDetailsService,
    private geolocationService: GeolocationService,
    private homeService: HomeService) {
      this.router.url == '/map' ? this.mapPage = true : this.mapPage = false;
     }


     ngOnInit(){
      
      this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Locating'}));
      this.filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState).pipe(
        tap(val => {
          val.locations.length <= 1 && val.locations[0].name === '' && this.initialLocationsFound === false ? this.homeService.geoMyLocation() : '';

          console.log('Map Page locations: ', val.locations);

          this.markers = this.mapService.createMarkersArray(val.locations);
          if( val.locations.length >= 1 && val.locations[0].name !== '' && this.initialLocationsFound === false) {
            this.initialLocationsFound = true;
            console.log('Setting New Bounds');
            this.setInitialBounds();
          } 
          if( val.locations.length >= 1 && val.locations[0].name !== ''){
            this.store.dispatch(SpinnerActions.SPINNER_END());
          }
        })
      )
     }


  openInfo(marker: MapMarker, content: Location) {
    this.infoContent = content;
    this.infoWindow.open(marker)
  }

  closeInfoWindow = () => {
    this.infoWindow.close();
  }

  currentInfoWindow = (window) => {
    this.infoWindow = window;
  }

  openBottomSheet = (content: Location) => {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {location: content}
    })
  }

  setInitialBounds = () => {
  //  console.log('Content changed');
  //  console.log('map bounds: ', this.map.getBounds());
  //  console.log('Marker Bounds: ', this.bounds);

 
  /* On the initial load, include the users location in the map bounds */

    this.store.select(FilterSelectors.getFilterState).subscribe(state => {
      
      console.log('Filter changed in map bounds')
      if(this.map.getBounds() !== this.bounds && !this.initialBoundsSet){
        this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Setting Map'}));
        // reset map bounds
        console.log('resetting map bounds')
        this.extendBounds(state.filters);
        } else {
          this.store.dispatch(SpinnerActions.SPINNER_END());
        }
    })
  }

  extendBounds = (filters) => {
   
    this.bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      // only include markers that will be displayed on the map
      if(filters.active && marker.info.active && marker.info.food!.active && marker.info.display || 
      filters.active && marker.info.active && marker.info.drinks!.active && marker.info.display || 
      filters.active && marker.info.active && marker.info.events!.active && marker.info.display ||
      !filters.active && marker.info.display){
        const latLng = new google.maps.LatLng(marker.position.lat, marker.position.lng)
        this.bounds.extend(latLng);
      }
    })
    this.map.fitBounds(this.bounds);
    console.log('Marker Count: ', this.markers.length);
    console.log('Marker Count: ', this.markers);
    this.markers[0].title !== "" ? this.initialBoundsSet = true : '';
  }

  openCitySelect = () => {
    this.mapService.openCitySelect();
  }

  evaluateMapDistanceFromLastCenter = () => {
    console.log("Event: ", this.map.getCenter()!.lat(), 'lng: ', this.map.getCenter()!.lng())
      this.mapService.evaluateMapDistanceFromLastCenter(this.map.getCenter()!.lat(), this.map.getCenter()!.lng(), this.filters);
  }

}
