import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GeolocationService } from '../shared/services/geolocation.service';
import * as geofire from 'geofire-common';

@Injectable()
export class HomeService {

    constructor(private geoService:GeolocationService){}

    geoMyLocation = () => {
        this.geoService.findIpGeo().subscribe(locationResults => console.log("Location Results :", locationResults))
    }
 
}