
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from 'src/app/shared/models/location.model';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';
import * as FilterSelectors from '../../shared/dialogs/search-filter/store/search-filter.selectors'

@Component({
  selector: 'app-mobile-results',
  templateUrl: './mobile-results.component.html',
  styleUrls: ['./mobile-results.component.scss']
})
export class MobileResultsComponent {
  filters$ = this.store.select(FilterSelectors.getFilterState);
  @Input() filteredLocations: Location[];
   categories = ['food', 'drinks', 'events'];
 // @Input() filteredLocations$: Observable<FilteredLocationsPackage>;

  constructor(
    private store: Store,
    private locationDetailsService: LocationDetailsService) {
  }

  openDetails = (index: number) => {
        this.locationDetailsService.openDetails(this.filteredLocations[index]);
    }
}
