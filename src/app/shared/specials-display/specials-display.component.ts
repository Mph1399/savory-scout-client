import { Component, Input, OnInit } from '@angular/core';
// import { FilterValues } from 'src/models/filter-values.model';
import { Location } from '../models/location.model';
// import { DisplayRestaurantsFilterService } from 'src/services/display-restaurants-filter.service';
import * as moment from 'moment'
import * as SearchFilterSelectors from '../search-filter/store/search-filter.selectors'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-specials-display',
  templateUrl: './specials-display.component.html',
  styleUrls: ['./specials-display.component.scss']
})
export class SpecialsDisplayComponent implements OnInit {
  filterValues = this.store.select(SearchFilterSelectors.getFilterState);
  @Input() location: Location;
  @Input() pageUrl: string;
  dayOfTheWeek = moment().format('ddd');
  date;
  categories = ['food', 'drinks', 'events'];
  dateTypes = ['recurringSpecials', 'specificDateSpecials'];
  constructor(
   // private displayRestaurantFilterService: DisplayRestaurantsFilterService
   private store: Store
    ) {
  }

  ngOnInit(): void {
    console.log('Location: ', this.location)

    this.date = new Date();
    // this.serializedDate = new FormControl((new Date()).toISOString());
   // this.dayOfTheWeek = this.displayRestaurantFilterService.formatDay(this.date);
  }

}
