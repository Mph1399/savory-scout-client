import { Geolocation } from './../models/geolocation.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as geofire from 'geofire-common';
import {map, tap } from 'rxjs/operators';
import {  BehaviorSubject, Subject } from 'rxjs';


interface IpCoords {
  location: {
    latitude: any;
    longitude: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
//public coordsSubject = new Subject<Geolocation>();
// coordsSubject$ = this.coordsSubject.asObservable(); 
lat: number;
lng: number;
coords = new BehaviorSubject({location: {lat: 0, lng: 0}});

  constructor(
    private http: HttpClient,
  ) { }

  findIpGeo = () => {
    return this.http.get(
      // "https://api.ipgeolocation.io/ipgeo?apiKey=112ed31d0d2c463e8fba619431227cd4"
     // "https://www.geoplugin.net/json.gp?"
     'https://api.ipregistry.co/?key=4dn46f0jy85r4r'
    ).pipe(
      map( (res: any) => {
     // this.coordsSubject.next({lat : parseFloat(res.location.latitude), lng : parseFloat(res.location.longitude)});
      this.lat = parseFloat(res.location.latitude);
      this.lng = parseFloat(res.location.longitude);
      this.coords.next({location: {lat: this.lat, lng: this.lng}})

      /* DEV TESTING */
      // return {
      //   lat: 50.507351,
      //   lng: -0.127758,
      //   hash: geofire.geohashForLocation([50.507351, -0.127758])
      //  }

      return {
              lat: res.location.latitude,
              lng: res.location.longitude,
              hash: geofire.geohashForLocation([res.location.latitude, res.location.longitude])
             }
    }));
  

    // .catch((err) => {
    //   // console.log('IP Geo Error: ');
    //   // console.dir(err);
    //   this.snackBar.open('Error finding your location.', '', {
    //     duration: 4000,
    //     verticalPosition: 'top',
    //   });
    // });

  }

  // returnIpPackage = () => {
  //   return this.findIpGeo().pipe(
  //         map(ipInfo => {
  //             return {
  //                 lat: ipInfo.location.latitude,
  //                 lng: ipInfo.location.longitude,
  //                 hash: geofire.geohashForLocation([ipInfo.location.latitude, ipInfo.location.longitude])
  //             }
  //         })
  //     )
  // }
// }
  fetchCoords = () => {
    return {lat: this.lat, lng: this.lng};
}
  fetchHash = () => {
   const hash =  geofire.geohashForLocation([this.lat, this.lng]);
   return hash;
  }
}
