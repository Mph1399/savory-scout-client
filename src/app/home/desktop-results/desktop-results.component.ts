import { Component, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from 'src/app/shared/models/location.model';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';

@Component({
  selector: 'app-desktop-results',
  templateUrl: './desktop-results.component.html',
  styleUrls: ['./desktop-results.component.scss']
})
export class DesktopResultsComponent {
 
  // @Input() dayOfTheWeek;
  // @Input() screenWidth;
   @Input() filteredLocations: Location[];
   categories = ['food', 'drinks', 'events'];

  constructor(
    private locationDetailsService: LocationDetailsService,
    private store: Store
    ) {}

  openDetails = (index: number) => {
      this.locationDetailsService.openDetails(this.filteredLocations[index]);
   }

   ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
