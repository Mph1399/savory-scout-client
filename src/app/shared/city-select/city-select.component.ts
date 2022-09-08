import { Component, Input, OnInit } from '@angular/core';
import { CitiesService } from 'src/services/cities.service';
import { RestaurantService } from 'src/services/restaurant.service';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit {
cities = this.citiesService.getCities();

  constructor(
    public citiesService: CitiesService,
    public restaurantService: RestaurantService
    ) { }

  ngOnInit(): void {
  }
onSearch = (city) => {
  this.restaurantService.seachbarSubmitted(city.value);
}
directCityChosen = (event) => {

}
}

