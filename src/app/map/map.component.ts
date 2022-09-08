import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

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
  bounds = new google.maps.LatLngBounds();


  constructor() { }

  ngOnInit(): void {
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker)
  }

}
