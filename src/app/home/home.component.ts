import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import { HomeService } from './home.service';
import * as FilterSelectors from '../shared/dialogs/search-filter/store/search-filter.selectors';
import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors';
import * as FilterActions from '../shared/dialogs/search-filter/store/search-filter.actions';
import { Observable, Subscription, tap } from 'rxjs';
import { Location } from '../shared/models/location.model';
import { LocationsState } from '../shared/firestore/store/firestore.reducers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  filteredLocations: Location[];
  filteredLocations$: Observable<LocationsState>
  filter;
  filter$ : Subscription;


  screenWidth = this.deviceDetailsService.screenWidth;
  constructor(
    private deviceDetailsService: DeviceDetailsService,
    private homeService: HomeService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.filter$ = this.store.select(FilterSelectors.getFilterState).
    subscribe(filterState => {
      this.filter = filterState.filters;
      this.filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState)
      .pipe(
        tap(val => {
        // console.log("Val in home: ", val)
         /* If the locations array length is greater than 0, check to see if at least one location has the display bool set to true. If not, set the search filter active
         bool to false so that specials are displayed. */ 
        if (val.locations.length > 0 ){
          let visible = false;
          val.locations.forEach(location => {
            location.display === true ? visible = true : '';
          })
          visible === false && this.filter.active ? this.store.dispatch(FilterActions.SET_FILTERS({active: false})) : '';
        }
    
          this.store.dispatch(SpinnerActions.SPINNER_END())
        //  val.locations.length  == 0 ? this.homeService.openCitySelect() : '';
        })
      )
    })
    console.log('screewidth: ', this.screenWidth)
    this.homeService.geoMyLocation();

   // this.geoService.findIpGeo().subscribe(locationResults => console.log("Location Results :", locationResults))
   // this.firestoreService.geoSearchLocations(this.geoService.fetchHash(), this.geoService.lat, this.geoService.lng)
    
    // this.serializedDate = new FormControl((new Date()).toISOString());
    // this.dayOfTheWeek = this.displayRestaurantFilterService.formatDay(this.date);
  }
  ngOnChanges(changes: SimpleChanges) {
     console.log('Changes: ', changes)
   }
}
