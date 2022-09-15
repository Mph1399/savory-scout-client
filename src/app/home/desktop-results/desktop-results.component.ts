import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

// import { FilteredLocationsPackage } from 'src/models/filtered-locations-package.model';
import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';

@Component({
  selector: 'app-desktop-results',
  templateUrl: './desktop-results.component.html',
  styleUrls: ['./desktop-results.component.scss']
})
export class DesktopResultsComponent {
 
  // @Input() dayOfTheWeek;
  // @Input() screenWidth;
 //  @Input() filteredLocations$: Observable<FilteredLocationsPackage>;
  categories = ['food', 'drinks', 'events'];

  constructor(
    // private deviceDetailsService: DeviceDetailsService
    private store: Store
    ) {
   }

  openDetails = (index: number) => {
  //  const selectedLocation$ =  this.filteredLocations$.pipe(first()).subscribe(val => {
  //     this.deviceDetailsService.openDetails(val.restaurants[index], this.screenWidth );
  //   });
  //  selectedLocation$.unsubscribe();
   }
}
