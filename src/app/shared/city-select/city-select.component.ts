import { HomeService } from './../../home/home.service';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { City, CitySelectService } from './city-select.service';
import * as FirestoreActions from '../../shared/firestore/store/firestore.actions'
// import { RestaurantService } from 'src/services/restaurant.service';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit {
cities = this.cityService.getCities();

  constructor(
    public cityService: CitySelectService,
    private store: Store,
    private homeService: HomeService

   // public restaurantService: RestaurantService
    ) { }

  ngOnInit(): void {
  }
onSearch = (city) => {
  console.log("City Selected: ", city)
  this.store.dispatch(FirestoreActions.GET_LOCATIONS_FROM_SEARCHBAR({input: city}))
}
nearbySearch = () => {
  this.homeService.geoMyLocation();
}
}

