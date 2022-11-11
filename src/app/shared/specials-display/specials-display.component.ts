import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { FilterValues } from 'src/models/filter-values.model';
import { Location } from '../models/location.model';
// import { DisplayRestaurantsFilterService } from 'src/services/display-restaurants-filter.service';
import * as moment from 'moment'
import * as SearchFilterSelectors from '../dialogs/search-filter/store/search-filter.selectors'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocationsState } from '../firestore/store/firestore.reducers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-specials-display',
  templateUrl: './specials-display.component.html',
  styleUrls: ['./specials-display.component.scss']
})
export class SpecialsDisplayComponent implements OnInit, OnChanges {
  filters$ = this.store.select(SearchFilterSelectors.getFilterState);
  @Input() location: Location;
  @Input() pageUrl: string;
  @Input() index: number;
  @Input() mapPage: Boolean = false;
  dayOfTheWeek = moment().format('ddd');
  date;
  map = false;
  categories = ['food', 'drinks', 'events'];
  dateTypes = ['recurringSpecials', 'specificDateSpecials'];
  constructor(
   // private displayRestaurantFilterService: DisplayRestaurantsFilterService
   private store: Store,
   private router: Router
    ) {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.router.url === '/map' ? this.map = true : this.map = false;
  }
  ngOnChanges(changes: SimpleChanges) {
   // console.log('Changes: ', changes)
  }

}
