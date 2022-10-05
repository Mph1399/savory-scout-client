import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import * as SpinnerActions from '../spinner/store/spinner.actions'

@Injectable()
export class GoogleService {

    constructor(private store: Store){}

    getCoordinates(address: string): Observable < any > {
        return from( new Promise((resolve, reject) => {
        const request = {
          address
        };
    
        const callback = (results, status) => {
          if (status === 'OK') {
            console.dir(results);
            resolve(results);
          } else {
            this.store.dispatch(SpinnerActions.SPINNER_END());
            reject({
              message: status
            });
          }
        };
        return new google.maps.Geocoder().geocode(request, callback);
      })
      );
    
     //  console.log('https://www.googleapis.com/geolocation/v1/geolocate?key=' + this.apiKey);
    //  return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + this.geocodeApiKey);
      }
}