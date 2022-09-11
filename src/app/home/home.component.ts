import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../shared/services/geolocation.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private geoService: GeolocationService,
    private homeService: HomeService
    ) { }

  ngOnInit(): void {
    this.homeService.geoMyLocation();
    
   // this.geoService.findIpGeo().subscribe(locationResults => console.log("Location Results :", locationResults))
   // this.firestoreService.geoSearchLocations(this.geoService.fetchHash(), this.geoService.lat, this.geoService.lng)
    
    // this.serializedDate = new FormControl((new Date()).toISOString());
    // this.dayOfTheWeek = this.displayRestaurantFilterService.formatDay(this.date);
  }

}
