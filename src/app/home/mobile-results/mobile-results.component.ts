import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// import { FilteredLocationsPackage } from 'src/models/filtered-locations-package.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-results',
  templateUrl: './mobile-results.component.html',
  styleUrls: ['./mobile-results.component.scss']
})
export class MobileResultsComponent {
  // @Input() filterValues: FilterValues;
  @Input() dayOfTheWeek: any;
  @Input() screenWidth: any;
 // @Input() filteredLocations$: Observable<FilteredLocationsPackage>;
  categories = ['food', 'drinks', 'events'];
  constructor(private deviceDetailsService: DeviceDetailsService) {
  }

  openDetails = (index: number) => {
    // const selectedLocation$ =  this.filteredLocations$.pipe(first()).subscribe(val => {
    //    this.deviceDetailsService.openDetails(val.restaurants[index], this.screenWidth );
    //  });
  //  selectedLocation$.unsubscribe();
    }
}
