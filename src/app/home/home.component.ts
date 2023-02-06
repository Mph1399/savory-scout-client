import { DeviceDetailsService } from 'src/app/shared/services/device-details.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SpinnerActions from '../shared/spinner/store/spinner.actions';
import { HomeService } from './home.service';
import * as FilterSelectors from '../shared/dialogs/search-filter/store/search-filter.selectors';
import * as FirestoreSelectors from '../shared/firestore/store/firestore.selectors';
import * as FilterActions from '../shared/dialogs/search-filter/store/search-filter.actions';
import { debounceTime, Observable, Subscription, tap, filter, distinctUntilChanged } from 'rxjs';
import { Location } from '../shared/models/location.model';
import { LocationsState } from '../shared/firestore/store/firestore.reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  filteredLocations: Location[];
  filteredLocations$: Observable<LocationsState>
  filter;
  filter$ : Subscription;
  changes;


  screenWidth = this.deviceDetailsService.screenWidth;
  constructor(
    private deviceDetailsService: DeviceDetailsService,
    private homeService: HomeService,
    private store: Store,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.filter$ = this.store.select(FilterSelectors.getFilterState).
    subscribe(filterState => {
      this.filter = filterState.filters;
      /* Check the current location state */
      this.filteredLocations$ = this.store.select(FirestoreSelectors.getLocationsState)
      .pipe(
        tap(val => {
         console.log("Val in home: ", val)
         /* If the locations array length is greater than 0, check to see if at least one location has the display bool set to true. If not, set the search filter active
         bool to false so that specials are displayed. */ 
        if (val.locations.length > 0 && val.locations[0].name !== '') {
          let visible = false;
          val.locations.forEach(location => {
            location.display === true ? visible = true : '';
          })
         if ( visible === false && this.filter.active){ 
          /* No locations are active so set the Active filter to false so that locations are displayed to the user. */
          this.store.dispatch(FilterActions.SET_FILTERS({active: false}));
          /* Display a snackbar saying that no active specials are happening in your area */
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: 'No ACTIVE specials in this area. Displaying locations offering specials at some time today',
              color: 'red-text',
            },
            panelClass: 'snackbar-font',
            duration: 10000,
          });
          }
        } 
          // close the spinner when results are found
          !val.locations[0] || val.locations[0].name !== '' ?  this.store.dispatch(SpinnerActions.SPINNER_END()) : '';
         
        }),


      )
    })
    /* 
    Instead of auto running, show a user prompt to hit a start search button on the first visit. If locations already exist, 
    auto update the results */
    this.homeService.geoMyLocation();

  }
  ngOnChanges(changes: SimpleChanges) {
    this.changes = changes;
   }
  
  ngOnDestroy(): void {
    this.filter$.unsubscribe();
  } 
}
