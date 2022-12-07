import { Geolocation } from './../models/geolocation.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as SpinnerActions from '../spinner/store/spinner.actions';
import * as geofire from 'geofire-common';
import {map, tap, catchError} from 'rxjs/operators';
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
export class GeolocationService {
//public coordsSubject = new Subject<Geolocation>();
// coordsSubject$ = this.coordsSubject.asObservable(); 
lat: number;
lng: number;
coords = new BehaviorSubject({location: {lat: 0, lng: 0}});

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  findIpGeo = (): Observable<GeoPackage> => {
    const scope = this;
    /* First try to use the Navigator to return a geolocation result. If Navigator is disabled or doesn't work, use the Users IP address to as a location point and search from there */
    if (navigator.geolocation) {
      console.log("Navigator : ", navigator.geolocation)


      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(position): Observable<GeoPackage> {
        const payload: any = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          hash: geofire.geohashForLocation([position.coords.latitude, position.coords.longitude])
         }
         return new Observable(payload);
      }
      
      function error(err): Observable<GeoPackage> {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        return scope.geoByIp()
      }
      
     return navigator.geolocation.getCurrentPosition(success, error, options)!;


  //   let payload: any;
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     console.log("Postion : ", position)
  //     payload =  {
  //         lat: position.coords.longitude,
  //         lng: position.coords.latitude,
  //         hash: geofire.geohashForLocation([position.coords.longitude, position.coords.latitude])
  //        }
  //     })
  //     console.log("Geo Payload: ", payload);
  //     /* If the navigator is available but unable to get he user location due to it being set to "Unallowed etc, revert to IP Address geolocation." */
  //    if(payload == undefined){ return this.geoByIp() 
  //   } else { return new Observable(payload);
  //   } 
   } else {
     console.log("No support for geolocation")
    return this.geoByIp();
    }
  }

  geoByIp = (): Observable<GeoPackage> => {
    console.log("Getting IP Geo")
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
}
