
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';
import { LocationDetailsService } from 'src/app/shared/services/location-details.service';
import * as FilterSelectors from '../../shared/dialogs/search-filter/store/search-filter.selectors';
import { CarouselComponent } from "angular-responsive-carousel";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mobile-results',
  templateUrl: './mobile-results.component.html',
  styleUrls: ['./mobile-results.component.scss']
})
export class MobileResultsComponent implements AfterViewInit, OnChanges{
  filters$ = this.store.select(FilterSelectors.getFilterState);
  @Input() filteredLocations: Location[];
  @ViewChild('carousel') carousel: CarouselComponent;
   categories = ['food', 'drinks', 'events'];
 // @Input() filteredLocations$: Observable<FilteredLocationsPackage>;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private locationDetailsService: LocationDetailsService) {
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }

  openDetails = (index: number) => {
        this.locationDetailsService.openDetails(this.filteredLocations[index]);
    }
  
  ngOnChanges(){
   // console.log('Changed');
    // If going from multi locations to less, the carousel needs to be resized so it doesn't show a blank cell
   try { this.carousel.resize()}
   catch(e){}
  }

}
