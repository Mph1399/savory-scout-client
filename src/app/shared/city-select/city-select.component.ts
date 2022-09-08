import { Component, Input, OnInit } from '@angular/core';
import { City, CitySelectService } from './city-select.service';
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
   // public restaurantService: RestaurantService
    ) { }

  ngOnInit(): void {
  }
onSearch = (city: Event) => {
  console.log("City Selected: ", (city.target as HTMLInputElement).value)
 // this.restaurantService.seachbarSubmitted(city.value);
}
directCityChosen = (event: any) => {

}
}

