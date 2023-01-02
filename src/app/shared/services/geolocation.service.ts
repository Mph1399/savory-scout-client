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
coords = new BehaviorSubject({location: {lat: 0, lng: 0}});

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 

    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        console.log("Position: ", pos)
        this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Asking For Browser Location'}));
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.coords.next({location: {lat: pos.coords.latitude, lng: pos.coords.longitude}})
      },
      (i)=>{
        console.log('GEO FAILED, IP BACKUp');
        this.store.dispatch(SpinnerActions.SPINNER_START({message: 'Browser Location Unavailable, Using IP'}));
        this.coords$ = this.geoByIp().subscribe(res => {
          this.lat = res.lat;
          this.lng = res.lng;
          this.coords.next({location: {lat: res.lat, lng: res.lng}})
      })
      }
    )
      }


  // getUserLocation = () : Observable<any> => {
  //   return this.geoByIp()
  //   .pipe(
  //     tap( coords  => {
  //       this.lat = coords.lat;
  //       this.lng = coords.lng;
  //       this.coords.next({location: {lat: coords.lat, lng: coords.lng}})
  //     }),
  //    switchMap( (coords):any => {
  //       if (navigator.geolocation) {
  //         console.log("Navigator : ", navigator.geolocation)
  //     try{  navigator.geolocation.getCurrentPosition(pos => {
  //       console.log("Browser Geo Working")
  //             return ({
  //               lat: pos.coords.latitude,
  //               lng: pos.coords.longitude,
  //               hash: geofire.geohashForLocation([pos.coords.latitude, pos.coords.longitude])
  //             } as GeoPackage)
  //         })
  //       } catch(e){
  //         console.log("User Geo Disabled, returning IP")
  //         return ({
  //           lat: coords.lat, 
  //           lng: coords.lng, 
  //           hash: geofire.geohashForLocation([coords.lat, coords.lng])
  //         } as GeoPackage )
  //       }
    
  //      } else {
  //       /* Location services are disabled on the user device */
  //        console.log("No support for geolocation")
  //        return ({
  //         lat: coords.lat, 
  //         lng: coords.lng, 
  //         hash: geofire.geohashForLocation([coords.lat, coords.lng])
  //       } as GeoPackage)
  //       }
  //     })
  //   )
  //   /* Try to use the Navigator to return a geolocation result. If Navigator is disabled or doesn't work, use the Users IP address to as a location point and search from there */
  // //   if (navigator.geolocation) {
  // //     console.log("Navigator : ", navigator.geolocation)
  // //     return this.geoByBrowser();

  // //  } else {
  // //   /* Location services are disabled on the user device */
  // //    console.log("No support for geolocation")
  // //    return this.geoByIp();
  // //   }
  // }

  

  // geoByBrowser = (): GeoPackage => {
  //   // this.store.dispatch(SpinnerActions.SPINNER_END());
  //   console.log('TEST')

  //   navigator.geolocation.getCurrentPosition(pos => {

  //   })







    //   return new Observable(obs => {
  //    navigator.geolocation.getCurrentPosition((position) => {
  //       console.log('TEST TEST');
  //       if(position !== undefined){
  //         console.log("Geo Allowed: ", position)
  //         /* Location is enabled on the device and allowed by the users browser */
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         this.coords.next({location: {lat: this.lat, lng: this.lng}})
  //          obs.next({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //           hash: geofire.geohashForLocation([position.coords.latitude, position.coords.longitude])
  //          });
  //          obs.complete();
  //       } else {
  //         console.log("Geolocation Disabled by user")
  //         /* location is enabled on the device but not allowed by the users browser. Use IP Address geo that was retrieved onInit */
  //         obs.next({
  //           lat: this.lat, 
  //           lng: this.lng, 
  //           hash: geofire.geohashForLocation([this.lat, this.lng])
  //         })
  //         obs.complete();
  //       }

  //      },
  //      error => {
  //       console.log('Lat: ', this.lat, ' lng : ', this.lng);
  //        obs.error(of({
  //         lat: this.lat, 
  //         lng: this.lng, 
  //         hash: geofire.geohashForLocation([this.lat, this.lng])
  //       }));
  //      }
  //    );
  //  });
  // }






   geoByIp = (): Observable<GeoPackage> => {
    console.log("Getting IP Geo")
     return this.http.get(
      // "https://api.ipgeolocation.io/ipgeo?apiKey=112ed31d0d2c463e8fba619431227cd4"
     // "https://www.geoplugin.net/json.gp?"
     'https://api.ipregistry.co/?key=4dn46f0jy85r4r'
    ).pipe(
      map( (res: any) => {
     // this.coordsSubject.next({lat : parseFloat(res.location.latitude), lng : parseFloat(res.location.longitude)});

      // this.lat = parseFloat(res.location.latitude);
      // this.lng = parseFloat(res.location.longitude);
      // this.coords.next({location: {lat: this.lat, lng: this.lng}})

      /* DEV TESTING */
      // return {
      //   lat: 50.507351,
      //   lng: -0.127758,
      //   hash: geofire.geohashForLocation([50.507351, -0.127758])
      //  }

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



      // const options = {
      //   enableHighAccuracy: true,
      //   timeout: 5000,
      //   maximumAge: 0
      // };
      
      // function success(position) {
      //   const payload: any = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //     hash: geofire.geohashForLocation([position.coords.latitude, position.coords.longitude])
      //    }
      //   of(payload);
      // }
      
      // function error(err) {
      //   console.warn(`ERROR(${err.code}): ${err.message}`);
      //   scope.geoByIp();
      // }
      
      // navigator.geolocation.getCurrentPosition(success, error, options)!;


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