declare var require: any;
import { FilterState, searchFilterReducer } from './../search-filter/store/search-filter.reducers';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '../models/location.model';
import * as moment from 'moment'
import * as SearchFilterSelectors from '../../shared/search-filter/store/search-filter.selectors';
import { initialState } from '../../shared/search-filter/store/search-filter.reducers'
import { Special } from '../models/special.model';

@Injectable()
export class DisplayLocationsService implements OnDestroy {
  categories = ['food', 'drinks', 'events'];
  dateTypes = ['recurringSpecials', 'specificDateSpecials'];
  todaysDate = moment().format('MMMM Do YYYY');
  dayOfTheWeek = moment().format('ddd');
  searchFilter: FilterState = initialState;
  searchFilter$ = this.store.select(SearchFilterSelectors.getFilterState).subscribe(filterState => {this.searchFilter = filterState});
   

  constructor(private store: Store) {}

  filterLocationResults = (locations: Location[]) => {
    console.log(this.searchFilter)
    /* Filter out locations according to the three main categories selected in the filter. i.e Food, drinks, events */
    /* Now we have locations array that just contains locations that offer a special on one of the selected main categories. Next we
    need to determine if the "Active filter is selected. If so, run the locations array through a method that returns the location only
    if one of the specials is currently happening." */
   return this.displaySelectedMainCategories(locations);
  };

  displaySelectedMainCategories = (locations: Location[]): Location[] => {
    const filteredSelectedMainCategories: Location[] = [];
    // Check to see if the location has specials that meet the filter crieria first. I.e it has Drink specials if that's selected.
    locations.forEach((location, index) => {
        
      this.categories.forEach((category) => {
        // If the current category is selected
        if (this.searchFilter.filters[category]) {
          this.dateTypes.forEach((dateType) => {
            if (location[category as keyof typeof location]![dateType as keyof typeof location].length > 0) {
             /* This location contains a main category that the filter has selected */
             /* Check if that category has a special that is currently active if the Active filter is selected */
             if(this.searchFilter.filters.active){
             filteredSelectedMainCategories[index] = this.displayLocationWithActiveSpecials(location, category, dateType);
             } else {
               /* Active isn't selected but the filter found a match for on of the search filter main categories. Assign the location to the results as inactive but
               has specials in one of the selected main categories(food, drinks, events) */ 
                filteredSelectedMainCategories[index] = location;
             }
            }
          });
        }
      });
    });
    return filteredSelectedMainCategories;
  };

  displayLocationWithActiveSpecials = (location: Location, category, dateType) => {
    /* For recurring specials, We will first check that the day of the week matches. Then, we will compare the start and end times with the current times  */
    let tempLocation: Location = location;
      /* Check the day of the week for a recurring special match */
      this.dateTypes.forEach((dateType) => {
        location[category][dateType].forEach((special: Special, index) => {
            if (dateType == "recurringSpecials" && special.days!.indexOf(this.dayOfTheWeek) != -1 || dateType === "specificDateSpecials" && special.date === this.todaysDate){
                tempLocation[category].active = true;
                tempLocation[category][dateType][index] =  this.determineIfSpecialTimeIsActive(special);
            } 
          });
      });
      return tempLocation;
     /* dayMatch and date match arrays now contain the specials that are matching todays day or date. 
     Now we need to check if those specials match up with the current time so we can mark them as active
     using a helper function.
     */
     // console.log('day Match: ', dayMatch, ' Date Match: ', dateMatch )
  }

  determineIfSpecialTimeIsActive = (special) => {
    /*  In order for a special to be active, the start difference should be a negative number and the end should be positive for most cases. Sometimes a restaurant 
      will have a special that technically ends the following day, for example, a special can start at 9PM and end at 2AM in the morning that night. In this case
      we'll get a result of two negative numbers. For this, the end difference should be a larger negative number than the start difference. i.e start = -255(minutes)
      & end = -782(minutes). When this is the case, we'll consider this and active special. */

    const now = moment(moment().format('hh:mmA'), 'hh:mmA');
    const start = moment(special.start, 'hh:mmA');
    const end = moment(special.end, 'hh:mmA');
    // If the end is after midnight
    if( end.isBefore(start) ){
        end.add(1, 'day');
      }
    const minutesDiffToStart = start.diff(now, 'minutes', true);
    const minutesDiffToEnd = end.diff(now, 'minutes', true);
    if(minutesDiffToStart < 0 && minutesDiffToEnd > 0){ 
        special.active = true;
        console.log('Minutes till end: ', minutesDiffToEnd  )
        special.color = this.assignColorToSpecial(minutesDiffToEnd);
        }
    return special
  }

  assignColorToSpecial = (minutesDiffToEnd, end?, now? ) => {
    /* When the specials are displayed, there are four colors that they can be, Red, Yellow, Green or grey. Their color is determined by how much time the special has left 
    until it's over. This helper func will assign a color to the color attribute of each active special*/
    switch (true) {
        case (minutesDiffToEnd > 90):
            return 'green';
            break;
        case (minutesDiffToEnd <= 90 && minutesDiffToEnd > 30):
            return 'yellow';
            break;
        case (minutesDiffToEnd <= 30 && minutesDiffToEnd > 0):
            return 'red';
            break;
        case (minutesDiffToEnd < 0):

        default:
            return 'grey';
            break;
    }
  }

  ngOnDestroy() {
    this.searchFilter$.unsubscribe();
  }
}
