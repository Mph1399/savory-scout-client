import { Geolocation } from './../models/geolocation.model';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as SpinnerActions from '../spinner/store/spinner.actions';
import * as geofire from 'geofire-common';
import {map, tap, catchError, switchMap} from 'rxjs/operators';
import {  BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Store } from '@ngrx/store';


interface IpCoords {
  location: {
    latitude: any;
    longitude: any;
  };
}

export interface GeoPackage {
  lat: number;
  lng: number;
  hash: geofire.Geohash;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService implements OnDestroy{
//public coordsSubject = new Subject<Geolocation>();
coords$: Subscription;
lat: number;
lng: number;
userCoords = new BehaviorSubject({location: {lat: 0, lng: 0}});
searchCoords = new BehaviorSubject({location: {lat: 0, lng: 0}});

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 

    navigator.geolocation.getCurrentPosition(
      (pos)=>{
       //  console.log("Position: ", pos)
       // this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Asking For Browser Location'}));
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.userCoords.next({location: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
        this.searchCoords.next({location: {lat: pos.coords.latitude, lng: pos.coords.longitude}})
      },
      (i)=>{
        console.log('GEO FAILED, IP BACKUp');
        this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Browser Location Unavailable, Using IP'}));
        this.coords$ = this.geoByIp().subscribe(res => {
          console.log('Coords: ', res)
          this.lat = res.lat;
          this.lng = res.lng;
          this.userCoords.next({location: {lat: res.lat, lng: res.lng}})
          this.searchCoords.next({location: {lat: res.lat, lng: res.lng}})
          this.store.dispatch(SpinnerActions.SPINNER_END());
      })
      }
    )
      }


   geoByIp = (): Observable<GeoPackage> => {
    console.log("Getting IP Geo")
     return this.http.get(
      // "https://api.ipgeolocation.io/ipgeo?apiKey=112ed31d0d2c463e8fba619431227cd4"
     // "https://www.geoplugin.net/json.gp?"
     'https://api.ipregistry.co/?key=4dn46f0jy85r4r'
    ).pipe(
      map( (res: any) => {

      return {
              lat: parseFloat(res.location.latitude),
              lng: parseFloat(res.location.longitude),
              hash: geofire.geohashForLocation([parseFloat(res.location.latitude), parseFloat(res.location.longitude)])
             }
    }),
    catchError((err) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: 'We could not access your location, please choose a city.',
          color: 'red-text',
        },
        duration: 3000,
      });
      this.store.dispatch(SpinnerActions.SPINNER_END());
      return of(err)
    })
    )
  }


  fetchCoords = () => {
    return {lat: this.lat, lng: this.lng};
}
  fetchHash = () => {
   const hash =  geofire.geohashForLocation([this.lat, this.lng]);
   return hash;
  }
  ngOnDestroy(){
    this.coords$.unsubscribe();
  }
}

