import { Special } from './../models/special.model';
declare var require: any;
import { FilterState, searchFilterReducer } from '../dialogs/search-filter/store/search-filter.reducers';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '../models/location.model';
import * as moment from 'moment'
import * as SearchFilterSelectors from '../dialogs/search-filter/store/search-filter.selectors';
import * as FirestoreSelectors from '../firestore/store/firestore.selectors'
import { initialState } from '../dialogs/search-filter/store/search-filter.reducers'


@Injectable()
export class DisplayLocationsService implements OnDestroy {
  categories = ['food', 'drinks', 'events'];
  dateTypes = ['recurringSpecials', 'specificDateSpecials'];
  todaysDate = moment().format('MMMM Do YYYY');
  dayOfTheWeek = moment().format('ddd');
  searchFilter: FilterState = initialState;
  secondaryCategories = ['breakfast','lunch','dinner','happyHour','brunch','kids'];
  secondaryFeatures = ['outdoorSeating'];
  searchFilter$ = this.store
    .select(SearchFilterSelectors.getFilterState)
    .subscribe((filterState) => (this.searchFilter = filterState));

  constructor(private store: Store) {}



  filterLocationResults = (locations: Location[]) => {
    // console.log('Filters: ', this.searchFilter.filters);
    // console.log('locations: ', locations)
    locations = JSON.parse(JSON.stringify(locations));
    /* Group the specials that have matching times,categories, days/date so that they can be displayed as a group un the search results */
    locations.forEach((location, index) => {
      locations[index] = this.groupSpecialsWithMatchingCriteria(location);
     if(  this.searchFilter.filters.outdoor && !location.outdoorSeating) {
       locations[index].active = false;} 
     });
    /* Filter out locations according to the three main categories selected in the filter. i.e Food, drinks, events */
    /* Now we have locations array that just contains locations that offer a special on one of the selected main categories. Next we
    need to determine if the "Active filter is selected. If so, run the locations array through a method that returns the location only
    if one of the specials is currently happening." */
    // console.log('Locations b4 filter: ', locations)

    return this.displaySelectedCategories(locations);
  };





  displaySelectedCategories = (locations: Location[]): Location[] => {
    const locationsWithSelectedCategories: Location[] = JSON.parse(
      JSON.stringify(locations)
    );
    /*  Check to see if the location has specials that meet the filter crieria first. I.e it has Drink specials if that's selected. */
    locations.forEach((location, index) => {
      /* Reset the active status of the currently saved location before filtering */
      locationsWithSelectedCategories[index].active = false;
      this.categories.forEach((category) => {
        /* Reeset the active status of the currently saved location category before filtering */
        locationsWithSelectedCategories[index][category].active = false;
        /* If the current category is selected in filter */
        // console.log(`Category: ${category}`,this.searchFilter.filters[category])
        if (this.searchFilter.filters[category]) {
          this.dateTypes.forEach((dateType) => {
            /* If the location category has specials in the array */
            if (
              location[category as keyof typeof location]![
                dateType as keyof typeof location
              ].length > 0
            ) {
              /* This location has specials a main category that the filter has selected */
              /* Check if that category has a special that is currently active if the Active filter is selected */
              if (this.searchFilter.filters.active) {
                const filteredSpecials = this.displayLocationWithActiveSpecials(
                  JSON.parse(JSON.stringify(location[category][dateType])),
                  category,
                  dateType
                );
                /* If one of the specials turns out to be active, mark the location and the location category as active: true. displayLocationWithActiveSpecials
will return a true boolean if any special turned out to be active */
                filteredSpecials.active
                  ? (locationsWithSelectedCategories[index].active = true)
                  : '';
                filteredSpecials.active
                  ? (locationsWithSelectedCategories[index][category].active =
                      true)
                  : '';
                locationsWithSelectedCategories[index][category][dateType] =
                  filteredSpecials.specials;
              } else {
                /* Active isn't selected but the filter found a match for on of the search filter main categories. 
                This means we're going to display all locations that have specials by setting the location.action to true and
                setting the specific categories*/
                locationsWithSelectedCategories[index] = location;
              }
            }
          });
        } else {
          /* The current category isn't selected in the filter. Just push the location to the filteredMainCategories without modification */
          locationsWithSelectedCategories[index][category].active = false;
          /* Set each special contained in the deselected category to inactive  */
          this.dateTypes.forEach((dateType) =>
            location[category][dateType].forEach(
              (special, k) =>
                (locationsWithSelectedCategories[index][category][dateType][
                  k
                ].active = false)
            )
          );
          /// filteredSelectedMainCategories[index] = location;
        }

        locationsWithSelectedCategories[index].active
          ? (locationsWithSelectedCategories[index] =
              this.filterSecondaryCategories(
                locationsWithSelectedCategories[index],
                category
              ))
          : '';
      });
    });
    return locationsWithSelectedCategories;
  };






  displayLocationWithActiveSpecials = (
    specials: Special[],
    category,
    dateType
  ) => {
    /* For recurring specials, We will first check that the day of the week matches. Then, we will compare the start and end times with the current times  */
    // let tempLocation: Location = location;
    let tempSpecials: Special[] = specials;
    let active = false;

    specials.forEach((special, i) => {
      //  location[category][dateType].forEach((special: Special, index) => {
      /* reset the active from previous filter setting/search */
      special.active = false;
      special.color = 'gray';
      /* For each special, Check if the day of the week for the special matches today in the case of arecurring special.
  If the special is on a specific date, check to see if that date is Todays date. */
      if (
        (dateType == 'recurringSpecials' &&
          special.days!.indexOf(this.dayOfTheWeek) != -1) ||
        (dateType === 'specificDateSpecials' &&
          special.date === this.todaysDate)
      ) {
        /*  A match was found for either the current day or date. Send the special to determine if the time of the specialis currently active. */
        tempSpecials[i] = this.determineIfSpecialTimeIsActive(special);
        /* If one of the specials is active, we need to set the whole location as active. Set a var to true and send it to parent method */
        tempSpecials[i].active ? (active = true) : '';
      }
      //   });
    });
    return { specials: tempSpecials, active };
    /* dayMatch and date match arrays now contain the specials that are matching todays day or date. 
     Now we need to check if those specials match up with the current time so we can mark them as active
     using a helper function. */
    // console.log('day Match: ', dayMatch, ' Date Match: ', dateMatch )
  };





  determineIfSpecialTimeIsActive = (special) => {
    /*  In order for a special to be active, the start difference should be a negative number and the end should be positive for most cases. */
    const now = moment(moment().format('hh:mmA'), 'hh:mmA');
    const start = moment(special.start, 'hh:mmA');
    const end = moment(special.end, 'hh:mmA');
    /* If the end is after midnight, add a day to adjust for ending on the next day */
    if (end.isBefore(start)) {
      end.add(1, 'day');
    }

    const minutesDiffToStart = start.diff(now, 'minutes', true);
    const minutesDiffToEnd = end.diff(now, 'minutes', true);
    if (minutesDiffToStart < 0 && minutesDiffToEnd > 0) {
      special.active = true;
      //console.log('Minutes till end: ', minutesDiffToEnd);
      special.color = this.assignColorToSpecial(minutesDiffToEnd);
    }
    return special;
  };






  assignColorToSpecial = (minutesDiffToEnd, end?, now?) => {
    /* When the specials are displayed, there are four colors that they can be, Red, Yellow, Green or grey. Their color is determined by how much time the special has left 
    until it's over. This helper func will assign a color to the color attribute of each active special*/
    switch (true) {
      case minutesDiffToEnd > 90:
        return 'green';
        break;
      case minutesDiffToEnd <= 90 && minutesDiffToEnd > 30:
        return 'yellow';
        break;
      case minutesDiffToEnd <= 30 && minutesDiffToEnd > 0:
        return 'red';
        break;
      case minutesDiffToEnd < 0:

      default:
        return 'grey';
        break;
    }
  };






  groupSpecialsWithMatchingCriteria = (location: Location) => {
    // create a clone of the location
    let sortedLocation = JSON.parse(JSON.stringify(location));

    this.categories.forEach((category) => {
      this.dateTypes.forEach((dateType) => {
        // set the tempLocation specials arrays to empty array to start with so grouped specials can be added

        sortedLocation[category][dateType] = [];
        location[category][dateType].forEach((special: Special, index) => {
          let match = false;
          // Make a deep copy of the sortedLocation Special
          sortedLocation[category][dateType] = JSON.parse(
            JSON.stringify(sortedLocation[category][dateType])
          );
          // Make a deep copy of title
          const title = JSON.parse(JSON.stringify(special.title));
          // The special has a title that is currently a string but we want it to be an array.
          special.title = [];
          special.title.push(`${title} - $${special.price.toString()}`);
          //console.log('Special Title: ', special.title)
          // sortedLocation[category][dateType] = JSON.parse(JSON.stringify(sortedLocation[category][dateType]))

          // Push the first special to the array
          if (index === 0) {
            sortedLocation[category][dateType].push(special);
            return;
          }

          // if the index is greater than 0 and the start time, end time, special Gategories, and Days or date all match, add the special title to the existing special im arry
          sortedLocation[category][dateType].forEach((sortedSpecial, k) => {
            if (
              index > 0 &&
              special.start == sortedSpecial.start &&
              special.end == sortedSpecial.end &&
              JSON.stringify(special.categories) ==
                JSON.stringify(sortedSpecial.categories) &&
              special.days !== null &&
              JSON.stringify(special.days) == JSON.stringify(sortedSpecial.days)
            ) {
              match = true;
              // console.log('Pushing: ', special.title[0], ' onto : ', sortedLocation[category][dateType][k].title)
              return sortedLocation[category][dateType][k].title.push(
                special.title[0]
              );
            } else if (
              index > 0 &&
              special.start == sortedSpecial.start &&
              special.end == sortedSpecial.end &&
              JSON.stringify(special.categories) ==
                JSON.stringify(sortedSpecial.categories) &&
              special.days == null &&
              JSON.stringify(special.date) == JSON.stringify(sortedSpecial.date)
            ) {
              match = true;
              // console.log('Pushing: ', special.title[0], ' onto : ', sortedLocation[category][dateType][k].title)
              return sortedLocation[category][dateType][k].title.push(
                special.title[0]
              );
            }
          });
          /*  A match was not found so push the special to the sortedSpecials array as a new special. 
          The first special of each category/dateType was already pushed to the new array so only push if 
          the index isn't 0.
          */
          //   console.log('Match: ', match);
          //   !match && index != 0 ? console.log('title: ', special.title) : '';
          !match && index != 0 ? (special.title[0] = special.title[0]) : '';
          !match && index != 0
            ? sortedLocation[category][dateType].push(special)
            : '';
        });
      });
    });
    return sortedLocation;
  };


  





  filterSecondaryCategories = (location: Location, category: string) => {
    this.dateTypes.forEach((dateType) => {
      location[category][dateType].forEach((special, k) => {
        // Only filter if the special is already set to be displayed
        if (special.active) {
          let active = false;
          special.categories.forEach((cat) => {
            this.searchFilter.filters[cat] == true ? (active = true) : '';
          });
          location[category][dateType][k].active = active;
        }
      });
    });
    return location;
  };

  ngOnDestroy() {
    this.searchFilter$.unsubscribe();
  }
}
