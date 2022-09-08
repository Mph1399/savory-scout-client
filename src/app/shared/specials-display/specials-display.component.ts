import { Component, Input, OnInit } from '@angular/core';
import { FilterValues } from 'src/models/filter-values.model';
import { Location } from 'src/models/location.model';
import { DisplayRestaurantsFilterService } from 'src/services/display-restaurants-filter.service';


@Component({
  selector: 'app-specials-display',
  templateUrl: './specials-display.component.html',
  styleUrls: ['./specials-display.component.scss']
})
export class SpecialsDisplayComponent implements OnInit {
  @Input() filterValues: FilterValues;
  @Input() location: Location;
  @Input() pageUrl: string;
  dayOfTheWeek;
  date;
  categories = ['food', 'drinks', 'events'];
  constructor(
    private displayRestaurantFilterService: DisplayRestaurantsFilterService) {
  }

  ngOnInit(): void {

    this.date = new Date();
    // this.serializedDate = new FormControl((new Date()).toISOString());
    this.dayOfTheWeek = this.displayRestaurantFilterService.formatDay(this.date);
  }

}
