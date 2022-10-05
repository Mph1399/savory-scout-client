import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors'

export interface Marker {
  position: {lat: number, lng: number},
  title: string,
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  apiLoaded: Observable<boolean>;
  zoom = 13;
  lastSelectedInfoWindow: any;
  center: google.maps.LatLngLiteral;
  infoContent = '';
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
  filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState)

  constructor(
    httpClient: HttpClient,
    private store: Store) {
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUMnV34ARb-r1YAPVpUMeG3aMG-u0dgjo', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
     }

  ngOnInit(): void {
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker)
  }

}
