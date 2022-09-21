import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


// import { FilteredLocationsPackage } from 'src/models/filtered-locations-package.model';
import { first } from 'rxjs/operators';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-mobile-results',
  templateUrl: './mobile-results.component.html',
  styleUrls: ['./mobile-results.component.scss']
})
export class MobileResultsComponent {
  @Input() filteredLocations: Location[];
   categories = ['food', 'drinks', 'events'];
 // @Input() filteredLocations$: Observable<FilteredLocationsPackage>;

  constructor(private deviceDetailsService: DeviceDetailsService) {
  }

  openDetails = (index: number) => {
        this.deviceDetailsService.openDetails(this.filteredLocations[index]);
    }
}
