
import { Component, Input } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';

@Component({
  selector: 'app-mobile-results',
  templateUrl: './mobile-results.component.html',
  styleUrls: ['./mobile-results.component.scss']
})
export class MobileResultsComponent {
  @Input() filteredLocations: Location[];
   categories = ['food', 'drinks', 'events'];
 // @Input() filteredLocations$: Observable<FilteredLocationsPackage>;

  constructor(private locationDetailsService: LocationDetailsService) {
  }

  openDetails = (index: number) => {
        this.locationDetailsService.openDetails(this.filteredLocations[index]);
    }
}
