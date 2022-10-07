import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors'
import { Location } from '../shared/models/location.model';
import { GeolocationService } from '../shared/services/geolocation.service';
import { MapService, Marker } from './map.service';
import * as FilterSelectors from '../shared/dialogs/search-filter/store/search-filter.selectors'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  filters$ = this.store.select(FilterSelectors.getFilterState);
  // apiLoaded: Observable<boolean>;
  lastSelectedInfoWindow: any;
  center: google.maps.LatLngLiteral;
  bounds: google.maps.LatLngBounds;
  initialBoundsSet = false;
  zoom = 13;
  infoContent: Location;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  markers: Array<Marker> = [];
  // bounds = new google.maps.LatLngBounds();
  filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState).pipe(
    tap(val => {
      console.log('Map Page locations: ', val.locations);
      this.markers = this.mapService.createMarkersArray(val.locations);
    })
  )

  constructor(
    httpClient: HttpClient,
    private geolocationService: GeolocationService,
    private mapService: MapService,
    private store: Store) {
      // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUMnV34ARb-r1YAPVpUMeG3aMG-u0dgjo', 'callback')
      // .pipe(
      //   map(() =>  true),
      //   catchError(() => of(false)),
      // );
     }

  ngOnInit(): void {
    this.geolocationService.findIpGeo().subscribe(location => {
      console.log('setting new location: ', location.lat, ' ', location.lng);
      this.center = {lat: location.lat, lng: location.lng}
    })
  }

  openInfo(marker: MapMarker, content: Location) {
    this.infoContent = content;
    this.infoWindow.open(marker)
  }

  setInitialBounds = () => {
    console.log('Content changed');
    console.log('map bounds: ', this.map.getBounds());
    console.log('Marker Bounds: ', this.bounds);

    if(this.map.getBounds() !== this.bounds && !this.initialBoundsSet){
    // reset map bounds
      this.bounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => {
      const latLng = new google.maps.LatLng(marker.position.lat, marker.position.lng)
      this.bounds.extend(latLng);
      })
      this.map.fitBounds(this.bounds);
      this.initialBoundsSet = true;
    }
  }
}
